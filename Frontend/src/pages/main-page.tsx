import { Button } from "@/components/ui/button";

export default function MainPage() {
    return (
        <>
            <div className="my-20">
                <h1 className="text-7xl my-5 text-center font-bold gray-900">SaleDrop</h1><br />
                <div className="text-center text-3xl">
                    Strona do rezerwacji biletów na wydarzenia online<br/>
                    Możliwość zapisu na najciekawsze wydarzenia tylko u nas!
                </div>
                <Button className="flex mx-auto mt-7 bg-blue-300" variant={"outline"} onClick={() => window.location.href = "/events"}>Sprawdź dostępne wydarzenia</Button>
            </div>
        </>
    )
}