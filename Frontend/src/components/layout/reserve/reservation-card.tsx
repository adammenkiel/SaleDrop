import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Dispatch, SetStateAction } from "react";

type ReservationCardProps = {
    setState: Dispatch<SetStateAction<number>>;
}

export default function ReservationCard(props : ReservationCardProps) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60">
		    <Card onClick={(event) => event.stopPropagation()} className="w-full max-w-sm">
		    	<CardHeader>
		    		<CardTitle>Potwierdzenie rezerwacji</CardTitle>
		    		<CardDescription>
		    			Wstępna rezerwacja biletu została dokonana! Aby sfinalizować proces proszę wybrać metodę płatności.
		    		</CardDescription>
		    	</CardHeader>
		    	<CardContent>
		    		<form>
		    			<div className="flex flex-col gap-6">
		    				<div className="grid gap-2">
		    					<Label htmlFor="username">Nazwa uzytkownika</Label>
		    					<Input
		    						id="username"
		    						type="text"
		    						placeholder="SimpleNick123"
		    						required
		    					/>
		    				</div>
		    				<div className="grid gap-2">
		    					<div className="flex items-center">
		    						<Label htmlFor="password">Hasło</Label>
		    					</div>
		    					<Input 
		    						id="password"
		    						type="password"
		    						required
		    					/>
		    				</div>
		    			</div>
		    		</form>
		    	</CardContent>
		    	<CardFooter className="flex-col gap-2">
		    		<Button onClick={() => {}} type="submit" className="w-full">
		    			Potwierdź rezerwację.
		    		</Button>
		    	</CardFooter>
		    </Card>
        </div>
    );
}