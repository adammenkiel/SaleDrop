import { createContext, useContext, useState} from "react";
import type { ReactNode } from "react";

type AuthVisibilitySettings = "register" | "login" | null;

type AuthState = {
    view : AuthVisibilitySettings;
    setView: (state: AuthVisibilitySettings) => void;
}

const AuthContext = createContext<AuthState | undefined> (undefined)

type Props = {
    children: ReactNode;
}

export const AuthProvider = ({children} : Props) => {
    const [view, setView] = useState<AuthVisibilitySettings>(null);

    return (
        <AuthContext.Provider value={{view, setView}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = (): AuthState => {
    const ctx = useContext(AuthContext);
    if(!ctx) {
        throw new Error("Use AuthProvider is required!");
    }
    return ctx;
}