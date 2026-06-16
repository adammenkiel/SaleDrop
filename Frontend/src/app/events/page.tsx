import EventCard from "@/components/layout/event-card";
import { EventCardEntity } from "@/entities/event-card-entity";


async function fetchCards() {
  const response = await fetch("http://localhost:3000/api/cards", {
    next: { revalidate: 60 }
  });
  return response.json();
};

export default async function App() {
    //Temporary
    const data: EventCardEntity[] = await fetchCards();
    return (
        <div className="flex flex-col min-h-[calc(100vh-236px)] gap-4">
            {data.map((card) => {
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