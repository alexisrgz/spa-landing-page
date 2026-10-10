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
      <div className="about-art">
        <Reveal className="about-image image-hover image-shape-organic-right" variant="image" delay={120}>
          <ImageWithFallback image={spa.images.interior1} />
        </Reveal>
        <div className="about-caption">
          <span>Naturalmente, tú.</span>
          <span>{spa.tagline}</span>
        </div>
      </div>
    </section>
  );
}
