import Hero from "./sections/Hero";
import About from "./sections/About";
import WhyUs from "./sections/WhyUs";
import Menu from "./sections/Menu";
import Specials from "./sections/Specials";
import Events from "./sections/Events";
import Booking from "./sections/Booking";
import Testimonials from "./sections/Testimonials";
import Gallery from "./sections/Gallery";
import Chefs from "./sections/Chefs";
import Contact from "./sections/Contact";
import Recruitment from "./sections/recruitment";
import LobsterFestHero from "./sections/LobsterFestHero";

export default function Home() {
  return (
    <>
      {/* <LobsterFestHero /> */}
      <Hero />
      <main id="main">
        <About />
        <WhyUs />
        <Menu />
        {/* <Specials /> */}
        {/* <Events /> */}
        <Booking />
        {/* <Testimonials /> */}
        {/* <Gallery /> */}
        <Chefs />
        <Recruitment />
        <Contact />
      </main>
    </>
  );
}
