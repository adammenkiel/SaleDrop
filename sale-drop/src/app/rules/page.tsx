"use client"


import NavigationBar from "@/components/layout/navigation-bar";
import Footer from "@/components/layout/footer";
import LoginCard from "@/components/layout/auth/login-card";
import RegisterCard from "@/components/layout/auth/register-card";
import { AuthProvider, useAuthContext } from "@/logic/auth-context";
import SuccessCard from "@/components/layout/auth/success-card";
import { AppProps } from "next/app";
import MainPage from "@/pages/main-page";
import EventsPage from "@/pages/events-page";
import RulesPage from "@/pages/rules-page";

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {/* Modals */}
      <AuthModals />
      {/* Navigation bar */}
      <NavigationBar />
      {/* Page content */}
      <div className="mx-[10%]">
        <RulesPage/>
      </div>
      {/* Footer */}
      <Footer />
    </AuthProvider>
  );
}