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
            <article
              key={experience.id}
              className={`experience-row experience-${experience.id}`}
              aria-labelledby={`experience-${experience.id}-title`}
            >
              <Reveal className="experience-number" variant="fade">
                {experience.id}
              </Reveal>
              <Reveal
                className="experience-image image-hover"
                variant="image"
                delay={60}
              >
                <ImageWithFallback
                  image={experience.image}
                  sizes="(max-width: 767px) 90vw, 50vw"
                />
              </Reveal>
              <Reveal className="experience-copy" delay={140}>
                <p className="eyebrow">{experience.category}</p>
                <h3 id={`experience-${experience.id}-title`}>
                  {experience.name}
                </h3>
                <p>{experience.description}</p>
                <WhatsAppButton variant="text" experience={experience.name}>
                  Consultar por WhatsApp
                </WhatsAppButton>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
