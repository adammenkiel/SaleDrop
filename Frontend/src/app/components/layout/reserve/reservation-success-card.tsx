
"use client"

import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ReservationStateEnum } from "@/logic/reservation-state"
import { Dispatch, SetStateAction } from "react"

type ReservationSuccessProps = {
    setReservationState : Dispatch<SetStateAction<ReservationStateEnum>>
}

export default function ReservationSuccessCard(props: ReservationSuccessProps) {
    return (
        <div onClick={() => props.setReservationState("without")} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60">
	    	<Card onClick={(event) => event.stopPropagation()} className="w-full max-w-sm">
	    		<CardHeader>
	    			<CardTitle>Rezerwacja przebiegła pomyślnie!</CardTitle>
	    		</CardHeader>
	    	</Card>
        </div>
    )
}