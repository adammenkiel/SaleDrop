"use client"

import EventCard from "@/components/layout/event-card";
import { EventCardEntity } from "@/entities/event-card-entity";
import { useEffect, useState } from "react";


export default function App() {
    //Temporary
    const [data, setData]= useState<EventCardEntity[]>([]);
  
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
                const card = item as EventCardEntity;
                return (
                    <EventCard 
                        ticketId={card.ticket_id}
                        key={card.ticket_id}
                        name={card.name}
                        shortDescription={card.short_description}
                        price={card.cost}
                    />
                );
            })}
        </div>
    );
}