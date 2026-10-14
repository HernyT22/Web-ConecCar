// ConecCar.rent — Alquiler de vehículos en Mendoza, Argentina
// Azul profundo + ámbar cálido
// App raíz: compone las secciones en orden.

import Nav from "@/app/components/ConecCar/Nav";
import Hero from "@/app/components/ConecCar/Hero";
import About from "@/app/components/ConecCar/About";
import Fleet from "@/app/components/ConecCar/Fleet";
import Destinations from "@/app/components/ConecCar/Destinations";
import Payments from "@/app/components/ConecCar/Payments";
import Reviews from "@/app/components/ConecCar/Reviews";
import Contact from "@/app/components/ConecCar/Contact";
import Footer from "@/app/components/ConecCar/Footer";
import Seo from "@/seo/Seo";

export default function App() {
  return (
    <>
      <Seo page="home" />
      <Nav />
      <main id="main">
      <Hero />
      <About />
      <Fleet />
      <Destinations />
      <Reviews />
      <Payments />
      <Contact />
      </main>
      <Footer />
    </>
  );
}