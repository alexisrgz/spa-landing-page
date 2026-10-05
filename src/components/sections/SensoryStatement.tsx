import { Reveal } from "../ui/Reveal";

const concepts = [
  ["Pausa", "Haz espacio para ti."],
  ["Cuidado", "Tratamientos pensados alrededor de tu bienestar."],
  ["Equilibrio", "Una experiencia que conecta cuerpo y mente."],
];

export function SensoryStatement() {
  return (
    <section className="sensory section-space" aria-labelledby="sensory-title">
      <div className="container">
        <Reveal className="sensory-heading" variant="fade">
          <p className="eyebrow">El arte de estar presente</p>
          <h2 id="sensory-title">
            Respira. <em>Desconecta.</em> Renueva.
          </h2>
          <Reveal className="sensory-rule" variant="line">
            <span className="sr-only">Una pausa para ti.</span>
          </Reveal>
        </Reveal>
        <div className="sensory-concepts">
          {concepts.map(([title, description], index) => (
            <Reveal delay={index * 80} key={title}>
              <span className="concept-number">0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
