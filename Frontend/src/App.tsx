
import NavigationBar from "@/components/layout/navigation-bar";
import Footer from "./components/layout/footer";
import LoginCard from "./components/layout/auth/login-card";
import RegisterCard from "./components/layout/auth/register-card";
import { useAuthContext } from "./logic/auth-context";
import SuccessCard from "./components/layout/auth/success-card";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventsPage from "./pages/events-page";
import MainPage from "./pages/main-page";
import RulesPage from "./pages/rules-page";

  export default function App() {
    const { view } = useAuthContext();
    return (
      <BrowserRouter>
        {/* Modals */}
        {view === "login" && (<LoginCard />)}
        {view === "register" && (<RegisterCard />)}
        {view === "success" && (<SuccessCard />)}

        {/* Navigation bar */}
        <NavigationBar />

        {/* Page content */}
        <div className="mx-[10%]">
          <Routes>
            <Route path = "/" element = {<MainPage />} />
            <Route path = "/events" element = {<EventsPage />} />
            <Route path = "/rules" element = {<RulesPage />} />
          </Routes>
        </div>
        {/* Footer */}
        <Footer />
      </BrowserRouter>
    );
  }