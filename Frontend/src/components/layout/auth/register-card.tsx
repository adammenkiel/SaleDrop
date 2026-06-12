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

export default function RegisterCard() {
	const { setView } = useAuthContext();
    return (
    <div onClick={() => setView(null)} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60">
		<Card onClick={(event) => event.stopPropagation()} className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Create your account</CardTitle>
				<CardDescription>
					Enter your username, email and password below to create new account
				</CardDescription>
				<CardAction>
					<Button variant="link">Log in</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<form>
					<div className="flex flex-col gap-6">
                        <div className="grid gap-2">
							<Label htmlFor="text">Username</Label>
							<Input
								id="username"
								type="text"
								placeholder="ExampleNick123"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input id="password" type="password" required />
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button type="submit" className="w-full">
					Create new account
				</Button>
			</CardFooter>
		</Card>
    </div>
    );
}