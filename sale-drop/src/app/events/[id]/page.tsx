"use client"

import ReservationCard from "@/components/layout/reserve/reservation-card";
import { Button } from "@/components/ui/button";
import { EventCardEntity } from "@/entities/event-card-entity";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function App() {
    const { id } = useParams();
    const [card, setCard] = useState<EventCardEntity>();
    const [reserved, setReserved] = useState(false);

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
	        const response = await fetch("http://localhost:3000/api/card/" + id, {
	        	method: "GET",
	        	credentials: "include",
	        	headers: {
	        		"Content-Type": "application/json"
	        	}
	        });
            const json = await response.json();
            setCard(parse(json));
        }
        fetchTicket();
    }, [id]);

    if(card === undefined) return (<></>);
    if(id === undefined) return(<></>)
    return (
        <>
        {reserved && (
            <>
                <ReservationCard ticketId={id} cost={card.cost} setReserved={setReserved} />
            </>
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
            <Button onClick={() => setReserved(true)} className="flex mx-auto mt-7 bg-blue-300" variant={"outline"}>Zarezerwuj bilet</Button>
        </div>
        </>
    );
}