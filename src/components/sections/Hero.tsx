import { ArrowDown, ArrowDownRight } from "lucide-react";
import { spa } from "../../data/site";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { WhatsAppButton } from "../ui/WhatsAppButton";

export function Hero() {
  return (
    <section
      id="inicio"
      className="hero container"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <p className="eyebrow hero-enter">Bienestar · Belleza · Relajación</p>
        <h1 id="hero-title" className="hero-enter">
          Regálate un
          <br />
          momento para
          <br />
          <em>volver a ti.</em>
        </h1>
        <p className="hero-description hero-enter">
          Una experiencia creada para desconectar,
          <br className="desktop-break" /> respirar y reconectar con tu
          bienestar.
        </p>
      </div>
      <div className="hero-art">
        <div className="hero-image-frame">
          <ImageWithFallback
            image={spa.images.hero}
            priority
            sizes="(max-width: 767px) 90vw, 50vw"
          />
        </div>
        <span className="hero-side-note">Un refugio para cuerpo y mente</span>
        <div className="hero-image-caption">
          <span>{spa.location}</span>
          <span>Est. 2026</span>
        </div>
      </div>
      <div className="hero-actions hero-enter">
        <a className="button button-solid" href="#experiencias">
          Descubrir experiencias
          <ArrowDownRight size={17} aria-hidden="true" />
        </a>
        <WhatsAppButton variant="text" />
      </div>
      <div className="hero-bottom">
        <span>El lujo de bajar el ritmo.</span>
        <a href="#filosofia" aria-label="Descubrir nuestra filosofía">
          <span>Desliza y respira</span>
          <ArrowDown size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
