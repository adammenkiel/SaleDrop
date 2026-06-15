
"use client"

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ReservationStateEnum } from "@/logic/reservation-state"
import { Dispatch, SetStateAction } from "react"

type ReservationErrorProps = {
    setReservationState: Dispatch<SetStateAction<ReservationStateEnum>>,
    errorMessage: string
}

export default function ReservationErrorCard(props : ReservationErrorProps) {
    return (
        <div onClick={() => props.setReservationState("without")} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60">
            <Card onClick={(event) => event.stopPropagation()} className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Error</CardTitle>
                    <CardDescription>
		    			{props.errorMessage}
		    		</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}