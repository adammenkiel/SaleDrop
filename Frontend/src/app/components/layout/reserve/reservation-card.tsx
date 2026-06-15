import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ReservationStateEnum } from "@/logic/reservation-state";
import {type Dispatch, type SetStateAction } from "react";

type ReservationCardProps = {
    ticketId: string;
    cost: number;
    setReservationState: Dispatch<SetStateAction<ReservationStateEnum>>;
	setErrorMessage: Dispatch<SetStateAction<string>>;
}

export default function ReservationCard(props : ReservationCardProps) {

    const pay = async (ticketId: string) => { // to correct
	    const response = await fetch("http://localhost:3000/pay", {
	    	method: "POST",
	    	credentials: "include",
	    	headers: {
	    		"Content-Type": "application/json"
	    	},
            body: JSON.stringify({
                ticket_id: ticketId
            })
	    });

        if(response.ok) {
			props.setReservationState("success");
        } else {
			const result = await response.text();

			props.setReservationState("error");
            if(result === "NO_MONEY") {
				props.setErrorMessage("Nie masz pieniędzy na koncie!");
				return;
			}
			props.setErrorMessage("Nieznany error, spróbuj ponownie później!");
		}
    }
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60">
		    <Card onClick={(event) => event.stopPropagation()} className="w-full max-w-sm">
		    	<CardHeader>
		    		<CardTitle>Potwierdzenie rezerwacji</CardTitle>
		    		<CardDescription>
		    			Wstępna rezerwacja biletu została dokonana! Aby sfinalizować proces proszę wybrać metodę płatności i kliknij przycisk potwierdź rezerwację.
		    		</CardDescription>
		    	</CardHeader>
		    	<CardContent>
		    		<form>
		    			<div className="flex flex-col gap-6">
                            <RadioGroup defaultValue="option1" className="w-fit">
                                <Field orientation="horizontal">
		                    		<RadioGroupItem value="option1" />
		                    		<FieldLabel className="font-normal">
		                    			SaleDrop Pay
		                    		</FieldLabel>
		                    	</Field>
		                    	<Field orientation="horizontal" data-disabled>
		                    		<RadioGroupItem value="option2" disabled />
		                    		<FieldLabel className="font-normal">
		                    			Karta debetowa
		                    		</FieldLabel>
		                    	</Field>
		                    </RadioGroup> 
		    			</div>
		    		</form>
		    	</CardContent>
		    	<CardFooter className="flex-col gap-2">
		    		<Button onClick={() => {pay(props.ticketId)}} type="submit" className="w-full">
		    			Potwierdź rezerwację
		    		</Button>
		    	</CardFooter>
		    </Card>
        </div>
    );
}