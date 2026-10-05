import { spa } from "../../data/site";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { Reveal } from "../ui/Reveal";

export function ImmersivePause() {
  return (
    <section className="immersive-pause" aria-labelledby="pause-title">
      <Reveal className="immersive-frame" variant="image">
        <ImageWithFallback image={spa.images.immersive} sizes="100vw" />
        <div className="immersive-caption">
          <h2 id="pause-title">
            Un refugio para
            <br />
            <em>bajar el ritmo.</em>
          </h2>
        </div>
      </Reveal>
    </section>
  );
}
