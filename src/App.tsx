import { useEffect, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Philosophy } from "./components/sections/Philosophy";
import { Experiences } from "./components/sections/Experiences";
import { SensoryStatement } from "./components/sections/SensoryStatement";
import { AboutSpa } from "./components/sections/AboutSpa";
import { ImmersivePause } from "./components/sections/ImmersivePause";
import { Gallery } from "./components/sections/Gallery";
import { Testimonials } from "./components/sections/Testimonials";
import { WhatsAppCTA } from "./components/sections/WhatsAppCTA";
import { Location } from "./components/sections/Location";
import { SocialGallery } from "./components/sections/SocialGallery";
import { FloatingWhatsApp } from "./components/ui/WhatsAppButton";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar scrolled={scrolled} />
      <main id="contenido">
        <Hero />
        <Philosophy />
        <Experiences />
        <SensoryStatement />
        <AboutSpa />
        <ImmersivePause />
        <Gallery />
        <Testimonials />
        <WhatsAppCTA />
        <Location />
        <SocialGallery />
      </main>
      <Footer />
      <FloatingWhatsApp visible={scrolled} />
    </>
  );
}
