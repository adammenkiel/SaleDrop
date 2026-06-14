"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useAuthContext } from "@/logic/auth-context";
import { useEffect, useState } from "react";

export default function NavigationBar() {
    const { setView } = useAuthContext();
    const isLogged = localStorage.getItem("logged");
    const [username, setUsername] = useState(localStorage.getItem("nickname"));
    const [money, setMoney] = useState(localStorage.getItem("money"));

    useEffect(() => {
        const fetchMe = async () => {
    	    const response = await fetch("http://localhost:3000/api/me", {
    	    	method: "POST",
    	    	credentials: "include"
    	    });
    	    if(response.ok) {
                const data = await response.json();
                localStorage.setItem("money", data.money);
                localStorage.setItem("nickname", data.nickName);
                setMoney(data.money);
    	    	setUsername(data.nickName);
    	    } else {
                localStorage.removeItem("logged");
                localStorage.removeItem("nickname");
                window.location.reload();
            }
        };
        if(isLogged) {
            fetchMe();
        }
    }, [isLogged]);
    
    return (
        <div className="flex sticky items-center top-0 w-full h-13 mb-2 px-4 bg-blue-400/50 backdrop-blur">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem onClick={() => {window.location.href = "/"}} className = "px-2">
                        <NavigationMenuLink>Strona główna</NavigationMenuLink>
                    </NavigationMenuItem>
                    {isLogged && (
                        <NavigationMenuItem onClick={() => {window.location.href = "/events"}} className = "px-2">
                            <NavigationMenuLink>Wydarzenia</NavigationMenuLink>
                        </NavigationMenuItem>
                    )}
                    <NavigationMenuItem onClick={() => {window.location.href = "/rules"}} className = "px-2">
                        <NavigationMenuLink>Regulamin</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className = "flex items-center ml-auto">
                {!isLogged ? (
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem className = "px-2">
                            <NavigationMenuLink onClick={() => {setView("login")}}>Logowanie</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className = "px-2">
                            <NavigationMenuLink onClick={() => {setView("register")}}>Rejestracja</NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                ) : (
                    <div>
                        Zalogowano jako: <b>{username}</b><br />
                        Portfel SaleDrop Pay: <b>{money} PLN</b>
                    </div>
                )}
            </div>
        </div>
    );
}