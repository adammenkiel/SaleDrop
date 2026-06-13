import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function EventDetailsPage() {
    const { id } = useParams();
    const [card, setCard] = useState<unknown>();
    useEffect(() => {
        const fetchTicket = async () => {
	        const response = await fetch("http://localhost:3000/api/card/" + id, {
	        	method: "GET",
	        	credentials: "include",
	        	headers: {
	        		"Content-Type": "application/json"
	        	}
	        });

            setCard(await JSON.stringify(await response.json()));
        }
        fetchTicket();
    });
    return (<>{card}</>);
}