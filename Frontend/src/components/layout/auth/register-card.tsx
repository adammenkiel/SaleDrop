import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/logic/auth-context";
import { useState } from "react";

export default function RegisterCard() {
	const { setView } = useAuthContext();
	//const [success, setSuccess] = useState<boolean>(false);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

	const fetchRegister = async (username: string, email: string, password: string) => {
		const response = await fetch("http://localhost:3000/api/auth/register", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{
					"username": username,
					"email": email,
					"password": password
				}
			)
		});
		if(response.ok) {
			setView("success");
		}
	};
    return (
    <div onClick={() => setView(null)} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60">
		<Card onClick={(event) => event.stopPropagation()} className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Stwórz konto</CardTitle>
				<CardDescription>
					Aby utworzyć nowe konto, proszę wprowadzić swoją nazwę użytkownika, email i hasło.
				</CardDescription>
				<CardAction>
					<Button variant="link">Log in</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<form>
					<div className="flex flex-col gap-6">
                        <div className="grid gap-2">
							<Label htmlFor="text">Nazwa użytkownika</Label>
							<Input
								onChange={(event) => setUsername(event.target.value)}
								id="username"
								type="text"
								placeholder="ExampleNick123"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								onChange={(event) => setEmail(event.target.value)}
								id="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Hasło</Label>
							</div>
							<Input
								onChange={(event) => setPassword(event.target.value)} 
								id="password"
								type="password"
								required
								/>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button onClick={() => {fetchRegister(username, email, password)}} type="submit" className="w-full">
					Stwórz nowe konto
				</Button>
			</CardFooter>
		</Card>
    </div>
    );
}