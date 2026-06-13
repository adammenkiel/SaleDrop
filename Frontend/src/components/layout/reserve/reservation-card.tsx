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
import type { Dispatch, SetStateAction } from "react";

type ReservationCardProps = {
    ticketId: string;
    setReserved: Dispatch<SetStateAction<boolean>>;
}

export default function ReservationCard(props : ReservationCardProps) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60">
		    <Card onClick={(event) => event.stopPropagation()} className="w-full max-w-sm">
		    	<CardHeader>
		    		<CardTitle>Potwierdzenie rezerwacji</CardTitle>
		    		<CardDescription>
		    			Wstępna rezerwacja biletu została dokonana! Aby sfinalizować proces proszę wybrać metodę płatności i kliknij przycisk "Potwierdź rezerwację".
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
		    		<Button onClick={() => {}} type="submit" className="w-full">
		    			Potwierdź rezerwację
		    		</Button>
		    	</CardFooter>
		    </Card>
        </div>
    );
}