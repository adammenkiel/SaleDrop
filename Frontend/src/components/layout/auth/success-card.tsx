import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAuthContext } from "@/logic/auth-context";

export default function SuccessCard() {
    const { setView } = useAuthContext();
    return (
        <div onClick={() => setView(null)} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60">
	    	<Card onClick={(event) => event.stopPropagation()} className="w-full max-w-sm">
	    		<CardHeader>
	    			<CardTitle>Rejestracja przebiegła pomyślnie</CardTitle>
	    		</CardHeader>
	    	</Card>
        </div>
    )
}