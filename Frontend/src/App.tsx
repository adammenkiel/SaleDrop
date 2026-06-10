
import NavigationBar from "@/components/layout/navigation-bar";
import Footer from "./components/layout/footer";

  export default function App() {
    return (
      <>
        {/* Navigation bar */}
        <NavigationBar />

        {/* Page content */}
        <div className="mx-[10%]">
          Page
        </div>

        {/* Footer */}
        <Footer />
      </>
    );
  }