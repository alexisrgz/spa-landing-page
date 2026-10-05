import { ArrowUpRight, MapPin, Phone, Camera } from "lucide-react";
import { spa } from "../../data/site";
import { getWhatsAppUrl } from "../../lib/whatsapp";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Location() {
  return (
    <section
      id="ubicacion"
      className="location section-space container"
      aria-labelledby="location-title"
    >
      <Reveal className="location-copy">
        <SectionHeading eyebrow="Te esperamos" id="location-title">
          <em>Visítanos</em>
        </SectionHeading>
        <address>
          <strong>{spa.location}</strong>
          <span>{spa.address}</span>
        </address>
        <p className="demo-note">{spa.addressNote}</p>
        <dl className="schedule">
          {spa.schedule.map((day) => (
            <div key={day.days}>
              <dt>{day.days}</dt>
              <dd>{day.hours}</dd>
            </div>
          ))}
        </dl>
        <div className="contact-links">
          <a href={`tel:${spa.phone.replace(/[^+\d]/g, "")}`}>
            <Phone size={16} aria-hidden="true" />
            {spa.phone}
          </a>
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            WhatsApp
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href={spa.instagramUrl} target="_blank" rel="noopener noreferrer">
            <Camera size={16} aria-hidden="true" />
            {spa.instagram}
          </a>
        </div>
      </Reveal>
      <Reveal className="map-placeholder" delay={100}>
        <div className="map-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="map-content">
          <span className="map-pin">
            <MapPin size={27} strokeWidth={1.3} aria-hidden="true" />
          </span>
          <span className="eyebrow">Cerca del mar. Cerca de ti.</span>
          <h3>{spa.name}</h3>
          <p>{spa.location}</p>
          <a
            href={spa.mapsUrl}
            className="button button-light"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir ubicación
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <small>Mapa ilustrativo · Explora Mazatlán</small>
        </div>
      </Reveal>
    </section>
  );
}
