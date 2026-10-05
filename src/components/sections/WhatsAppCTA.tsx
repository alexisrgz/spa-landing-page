import { Reveal } from "../ui/Reveal";
import { WhatsAppButton } from "../ui/WhatsAppButton";

export function WhatsAppCTA() {
  return (
    <section className="contact-cta" aria-labelledby="contact-title">
      <Reveal className="container contact-inner" variant="fade">
        <div>
          <p className="eyebrow">Haz de ti una prioridad</p>
          <h2 id="contact-title">
            Tu momento de bienestar
            <br />
            <em>empieza aquí.</em>
          </h2>
          <p>
            Conoce nuestros tratamientos y encuentra la experiencia ideal para
            ti.
          </p>
        </div>
        <div className="contact-action">
          <WhatsAppButton variant="light" />
          <span>Hablemos de tu próxima pausa.</span>
        </div>
      </Reveal>
    </section>
  );
}
