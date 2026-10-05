import { benefits, spa } from "../../data/site";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function AboutSpa() {
  return (
    <section
      id="nosotros"
      className="about section-space container"
      aria-labelledby="about-title"
    >
      <Reveal className="about-copy">
        <SectionHeading
          eyebrow={`La esencia de ${spa.wordmark}`}
          id="about-title"
        >
          Un espacio
          <br />
          <em>pensado para ti.</em>
        </SectionHeading>
        <p>
          {spa.name} nace como un lugar para desacelerar, cuidar de ti y
          disfrutar una experiencia personalizada en un ambiente sereno y
          contemporáneo.
        </p>
        <ol className="benefits">
          {benefits.map((benefit, index) => (
            <li key={benefit}>
              <span>0{index + 1}</span>
              {benefit}
            </li>
          ))}
        </ol>
      </Reveal>
      <Reveal className="about-art" delay={100}>
        <div className="about-image image-hover">
          <ImageWithFallback image={spa.images.interior1} />
        </div>
        <div className="about-caption">
          <span>Naturalmente, tú.</span>
          <span>{spa.tagline}</span>
        </div>
      </Reveal>
    </section>
  );
}
