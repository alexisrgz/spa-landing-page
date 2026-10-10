import { spa } from "../../data/site";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { Reveal } from "../ui/Reveal";

export function ImmersivePause() {
  return (
    <section className="immersive-pause section-space" aria-labelledby="pause-title">
      <div className="immersive-inner container">
        <Reveal className="immersive-copy">
          <p className="eyebrow">Una pausa para ti</p>
          <h2 id="pause-title">
            Un refugio para
            <br />
            <em>bajar el ritmo.</em>
          </h2>
          <p className="immersive-description">
            Un espacio pensado para desconectar del exterior y reconectar contigo.
          </p>
        </Reveal>
        <Reveal className="immersive-frame image-shape-arch" variant="image" delay={100}>
          <ImageWithFallback
            image={spa.images.immersive}
            sizes="(max-width: 767px) 86vw, 410px"
          />
        </Reveal>
      </div>
    </section>
  );
}
