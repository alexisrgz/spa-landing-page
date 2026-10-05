import { ArrowUpRight, Camera } from "lucide-react";
import { socialGallery, spa } from "../../data/site";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { Reveal } from "../ui/Reveal";

export function SocialGallery() {
  return (
    <section
      className="social section-space container"
      aria-labelledby="social-title"
    >
      <Reveal className="social-heading">
        <div>
          <p className="eyebrow">Un poco de calma en tu día</p>
          <h2 id="social-title">
            Síguenos en <em>Instagram</em>
          </h2>
        </div>
        <a
          className="text-link"
          href={spa.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Camera size={17} aria-hidden="true" />
          {spa.instagram}
          <ArrowUpRight size={16} aria-hidden="true" />
          <span className="sr-only"> — Ver Instagram</span>
        </a>
      </Reveal>
      <div className="social-grid">
        {socialGallery.map((image, index) => (
          <Reveal key={image.src} delay={index * 80} className="image-hover">
            <ImageWithFallback
              image={image}
              sizes="(max-width: 600px) 45vw, 33vw"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
