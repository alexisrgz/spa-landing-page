import { spa } from "../../data/site";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Philosophy() {
  return (
    <section
      id="filosofia"
      className="philosophy section-space container"
      aria-labelledby="philosophy-title"
    >
      <Reveal className="philosophy-image">
        <ImageWithFallback image={spa.images.about} />
        <span className="image-footnote">
          Lo esencial está en los pequeños detalles.
        </span>
      </Reveal>
      <Reveal className="philosophy-copy" delay={100}>
        <SectionHeading eyebrow="Nuestra filosofía" id="philosophy-title">
          Un espacio creado
          <br />
          para <em>hacer una pausa.</em>
        </SectionHeading>
        <p>
          En {spa.wordmark.charAt(0) + spa.wordmark.slice(1).toLowerCase()}{" "}
          creemos que cuidarte también significa detenerte. Cada detalle ha sido
          pensado para ayudarte a desconectar del ritmo diario y regalarte un
          momento de bienestar.
        </p>
        <div className="philosophy-signature">
          <span className="fine-line" />
          <span>Sin prisa. A tu ritmo.</span>
        </div>
      </Reveal>
    </section>
  );
}
