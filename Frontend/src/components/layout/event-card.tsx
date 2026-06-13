import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


type EventCardProps = {
    ticketId: number,
    name : string,
    shortDescription : string,
    price : number
};

export default function EventCard({ticketId, name, shortDescription, price} : EventCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{shortDescription}</CardDescription>
                <CardAction>
                    <Button onClick={() => {window.location.href="/events/" + ticketId}} variant={"default"} className={"bg-blue-800"}>Więcej informacji</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                Koszt uczestnictwa w wydarzeniu: {price} PLN
            </CardContent>
        </Card>
    );
}