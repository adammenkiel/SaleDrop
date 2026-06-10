
import NavigationBar from "@/components/layout/navigation-bar";
import Footer from "./components/layout/footer";
import EventCard from "./components/layout/event-card";

  export default function App() {
    return (
      <>
        {/* Navigation bar */}
        <NavigationBar />

        {/* Page content */}
        <div className="flex flex-col mx-[10%] gap-4">
          <EventCard name="Spotkanie informacyjne w Warszawie" shortDescription="Jest to nasze III spotkanie! Odbędzie się ono w hali XYZ." price={1000} />
          <EventCard name="Spotkanie IT w Świnoujściu" shortDescription="Spotkanie będzie prowadzone przez firmę XYZ, ma ono na celu XYZ2" price={40} />
          <EventCard name="Konferencja w Krakowie" shortDescription="Spotkanie odbędzie się w hali XYZ." price={600} />
          <EventCard name="Koncert w Rzeszowie" shortDescription="Ma ono na celu XYZ, mam nadzieję że zjawi się dużo osób." price={100} />
          <EventCard name="Koncert w Warszawie" shortDescription="Jakiś kolejny opis, nie wiem co wymyśleć." price={4000} />
          <EventCard name="Kurs godzinny w Radomiu" shortDescription="Ok ale fajnie <3" price={123} />
        </div>

        {/* Footer */}
        <Footer />
      </>
    );
  }