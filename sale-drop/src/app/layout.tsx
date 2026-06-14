"use client"

import "../globals.css"
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import NavigationBar from "./components/layout/navigation-bar";
import { AuthProvider, useAuthContext } from "./logic/auth-context";
import LoginCard from "./components/layout/auth/login-card";
import SuccessCard from "./components/layout/auth/success-card";
import RegisterCard from "./components/layout/auth/register-card";
import Footer from "./components/layout/footer";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export function AuthModals() {
    const { view } = useAuthContext();
    return (
    <>
      {view === "login" && (<LoginCard />)}
      {view === "register" && (<RegisterCard />)}
      {view === "success" && (<SuccessCard />)}
    </>
    )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <AuthProvider>
          {/* Modals */}
          <AuthModals />
          {/* Navigation bar */}
          <NavigationBar />
          {/* Page content */}
          <div className="mx-[10%]">
            {children}
          </div>
          {/* Footer */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}