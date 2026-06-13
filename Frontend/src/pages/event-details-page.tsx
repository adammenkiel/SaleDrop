import type { EventCardEntity } from "@/entities/event-card-entity";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function EventDetailsPage() {
    const { id } = useParams();
    const [card, setCard] = useState<EventCardEntity>();
    useEffect(() => {
        const fetchTicket = async () => {
	        const response = await fetch("http://localhost:3000/api/card/" + id, {
	        	method: "GET",
	        	credentials: "include",
	        	headers: {
	        		"Content-Type": "application/json"
	        	}
	        });
            setCard(await response.json());
        }
        fetchTicket();
    });

    if(card === undefined) return (<></>);
    return (
    <>
        <h1 className="text-3xl font-bold gray-900">Wydarzenie: {card.name}</h1>
        <h1 className="text-2xl gray-900">Pełny opis: {card.description}</h1><br />
        <h1 className="text-1xl gray-900"> {card.ticket_date}</h1><br />
    </>
    );
}