import { experiences } from "../../data/site";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { WhatsAppButton } from "../ui/WhatsAppButton";

export function Experiences() {
  return (
    <section
      id="experiencias"
      className="experiences section-space"
      aria-labelledby="experiences-title"
    >
      <div className="container">
        <Reveal className="section-intro">
          <SectionHeading eyebrow="Nuestros rituales" id="experiences-title">
            Experiencias para
            <br />
            <em>cuerpo y mente.</em>
          </SectionHeading>
          <p>
            Cada persona, un universo.
            <br />
            Encuentra el ritual que necesitas hoy.
          </p>
        </Reveal>
        <div className="experience-list">
          {experiences.map((experience) => (
            <Reveal key={experience.id} className="experience-row">
              <span className="experience-number">{experience.id}</span>
              <div className="experience-image image-hover">
                <ImageWithFallback
                  image={experience.image}
                  sizes="(max-width: 767px) 90vw, 35vw"
                />
              </div>
              <div className="experience-copy">
                <p className="eyebrow">{experience.category}</p>
                <h3>{experience.name}</h3>
                <p>{experience.description}</p>
                <WhatsAppButton variant="text" experience={experience.name}>
                  Consultar por WhatsApp
                </WhatsAppButton>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
