import EventCard from "@/components/layout/event-card";
import { useEffect, useState } from "react";

export default function EventsPage() {
    //Temporary
    const [data, setData]= useState<unknown[]>([]);

    
    useEffect(() => {
        const fetchCards = async () => {
    	    const response = await fetch("http://localhost:3000/api/cards", {
    	    	method: "GET",
    	    	credentials: "include"
    	    });
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            setData(jsonResponse);
        };
        fetchCards();
    }, []);
    if(data.length == 0) {
        return (<></>);
    }

    return (
        <div className="flex flex-col gap-4">
            {data.map((item) => {
                const card = item as any;
                return (
                    <EventCard ticketId={card.ticket_id} key={card.ticket_id} name={card.name} shortDescription={card.short_description} price={123} />
                );
            })}
        </div>
    );
}