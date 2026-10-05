import { spa, testimonials } from "../../data/site";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Testimonials() {
  return (
    <section
      id="testimonios"
      className="testimonials section-space"
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Momentos que se quedan"
            id="testimonials-title"
          >
            Lo que se siente al <em>hacer una pausa.</em>
          </SectionHeading>
        </Reveal>
        <div className="testimonial-grid">
          {testimonials.map((quote, index) => (
            <Reveal key={quote} delay={index * 80}>
              <figure>
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
                <blockquote>{quote}</blockquote>
                <figcaption>
                  <span className="fine-line" />
                  Cliente {spa.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="demo-note">Contenido ilustrativo de esta versión demo.</p>
      </div>
    </section>
  );
}
