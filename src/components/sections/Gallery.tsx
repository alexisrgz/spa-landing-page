import { ArrowDownRight } from "lucide-react";
import { gallery, spa } from "../../data/site";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Gallery() {
  return (
    <section
      id="galeria"
      className="gallery section-space container"
      aria-labelledby="gallery-title"
    >
      <Reveal className="section-intro">
        <SectionHeading eyebrow="Nuestro refugio" id="gallery-title">
          Un vistazo a{" "}
          <em>
            {spa.wordmark.charAt(0) + spa.wordmark.slice(1).toLowerCase()}
          </em>
        </SectionHeading>
        <span className="gallery-note">
          Calma en cada rincón
          <ArrowDownRight size={24} strokeWidth={1} aria-hidden="true" />
        </span>
      </Reveal>
      <div className="gallery-grid">
        {gallery.map((image, index) => (
          <Reveal
            key={image.src}
            className={`gallery-item gallery-item-${index + 1} image-hover`}
            delay={index * 60}
          >
            <ImageWithFallback
              image={image}
              sizes="(max-width: 767px) 90vw, (max-width: 1023px) 50vw, 40vw"
            />
          </Reveal>
        ))}
      </div>
      <p className="gallery-caption">
        <span>Luz, texturas y naturaleza.</span>
        <span>Un lugar para simplemente ser.</span>
      </p>
    </section>
  );
}
