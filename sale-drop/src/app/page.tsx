"use client"


import NavigationBar from "@/components/layout/navigation-bar";
import Footer from "./components/layout/footer";
import LoginCard from "./components/layout/auth/login-card";
import RegisterCard from "./components/layout/auth/register-card";
import { AuthProvider, useAuthContext } from "./logic/auth-context";
import SuccessCard from "./components/layout/auth/success-card";

console.log('NavigationBar:', NavigationBar);
console.log('Footer:', Footer);

import { AppProps } from "next/app";
import MainPage from "./pages/main-page";

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
        <MainPage/>
      </div>
      {/* Footer */}
      <Footer />
    </AuthProvider>
  );
}