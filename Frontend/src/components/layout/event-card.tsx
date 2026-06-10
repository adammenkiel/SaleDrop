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
    name : string,
    shortDescription : string,
    price : number
};

export default function EventCard({name, shortDescription, price} : EventCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{shortDescription}</CardDescription>
                <CardAction>
                    <Button variant={"default"} className={"bg-blue-800"}>Więcej informacji</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                Koszt uczestnictwa w wydarzeniu: {price} PLN
            </CardContent>
        </Card>
    );
}