import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useAuthContext } from "@/logic/auth-context";


export default function NavigationBar() {
    const { setView } = useAuthContext();
    return (
        <div className="flex sticky items-center top-0 w-full h-13 mb-2 px-4 bg-blue-400/50 backdrop-blur">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem className = "px-2">
                        <NavigationMenuLink>Strona główna</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className = "px-2">
                        <NavigationMenuLink>Wydarzenia</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className = "px-2">
                        <NavigationMenuLink>Regulamin</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className = "flex items-center ml-auto">
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
            </div>
        </div>
    );
}