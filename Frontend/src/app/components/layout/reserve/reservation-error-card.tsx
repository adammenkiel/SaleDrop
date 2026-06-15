
"use client"

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


type ReservationErrorProps = {
    errorMessage: string
}

export default function ReservationErrorCard(props : ReservationErrorProps) {
    return (
        <div onClick={() => location.reload()} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60">
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