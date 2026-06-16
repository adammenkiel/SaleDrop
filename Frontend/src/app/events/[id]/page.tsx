"use client"

import ReservationCard from "@/components/layout/reserve/reservation-card";
import ReservationErrorCard from "@/components/layout/reserve/reservation-error-card";
import ReservationSuccessCard from "@/components/layout/reserve/reservation-success-card";
import { Button } from "@/components/ui/button";
import { EventCardEntity } from "@/entities/event-card-entity";
import { ReservationStateEnum } from "@/logic/reservation-state";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function App() {

    const { id } = useParams();
    const [card, setCard] = useState<EventCardEntity | string>("Loading...");
    const [reservationState, setReservationState] = useState<ReservationStateEnum>("without"); // responses just for modal
    const [alreadyReserving, setAlreadyReserving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const reserve = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reserve`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{
					"ticket_id": id
				}
			)
		});
        console.log(response.status);
        if(!await response.json()) {
            setAlreadyReserving(false);
            setReservationState("without");
            //window.location.href = "events/" + id;
        }
    }

    useEffect(() => {
        const parse = (dto: any) : EventCardEntity => {
            return {
                ...dto,
                ticket_date: new Date(dto.ticket_date),
                start_event_date: new Date(dto.start_event_date),
                end_event_date: new Date(dto.end_event_date)
            }
        };

        const fetchTicket = async () => {
	        try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/card/` + id, {
	            	method: "GET",
	            	credentials: "include",
	            	headers: {
	            		"Content-Type": "application/json"
	            	}
	            });
                const json = await response.json();
                setCard(parse(json));
            } catch {
                setCard("Auth");
            }
        }
        fetchTicket();

        const inReserveProcessCheck = async () => { // to correct
	        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reserve/` + id, {
	        	method: "GET",
	        	credentials: "include",
	        	headers: {
	        		"Content-Type": "application/json"
	        	}
	        });
            setAlreadyReserving(await response.json());
        }
        inReserveProcessCheck();

        const socket = new WebSocket(`${process.env.NEXT_PUBLIC_API_URL}/ws?ticketId=${id}`);

        socket.onopen = () => {
          console.log("Connected");
        };
        socket.onmessage = (event) => {
            if(JSON.parse(event.data).updateTicket) {
                fetchTicket();
            }
            if(JSON.parse(event.data).keepAlive) {
                socket.send(JSON.stringify({keepAlive: Date.now()}));
            }
        }
    }, [id]);

    const throwInformation = () => {
        return (
        <div className="text-3xl text-center my-10">
            Prosimy się zarejestrować lub zalogować!
        </div>
      )
    };
    if(card === undefined) return throwInformation();
    if(id === undefined) throwInformation();
    if(typeof id !== "string") return throwInformation();
    if(typeof card === "string")  {
        if(card === "Auth") {
            return throwInformation();
        }
        return (<></>);
    }
    return (
        <div className="min-h-[calc(100vh-266px)]">
        {reservationState === "reserving" && (
            <ReservationCard ticketId={id} cost={card.cost} setReservationState={setReservationState} setErrorMessage={setErrorMessage} />
        )}
        {reservationState === "error" && (
            <ReservationErrorCard errorMessage={errorMessage} />
        )}
        {reservationState === "success" && (
            <ReservationSuccessCard />
        )}

        <div className="text-center my-10">
            <h1 className="text-3xl font-bold gray-900">Wydarzenie: {card.name}</h1>
            <h1 className="text-2xl gray-900">Pełny opis: {card.description}</h1>
            <br />
            <h1 className="text-1xl gray-900"> Koszt kupna biletu: {card.cost} zł</h1>
            <h1 className="text-1xl gray-900"> Ilość pozostałych biletów: {card.amount}</h1>
            <br />
            <h1 className="text-1xl gray-900"> Bilety można kupować do: {card.ticket_date.toLocaleString("pl-PL")}</h1>
            <h1 className="text-1xl gray-900"> Data rozpoczęcia: {card.start_event_date.toLocaleString("pl-PL")}</h1>
            <h1 className="text-1xl gray-900"> Data zakończenia: {card.end_event_date.toLocaleString("pl-PL")}</h1>

            <Button onClick={
                () => {
                    setReservationState("reserving");
                    reserve();
                }
            } disabled={alreadyReserving || card.amount===0} className="flex mx-auto mt-7 bg-blue-300" variant={"outline"}>
                {alreadyReserving ? 
                    <>Jesteś w trakcie rezerwacji</> 
                : 
                    (
                        <>
                            {card.amount===0 ? <>Rezerwacja niedostępna</> : <>Zarezerwuj bilet</>}
                        </>
                    )
                }
            </Button>
            
        </div>
        </div>
    );
}