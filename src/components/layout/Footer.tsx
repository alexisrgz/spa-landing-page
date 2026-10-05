import { useRef, useState } from "react";
import { X } from "lucide-react";
import { navigation, spa } from "../../data/site";
import { getWhatsAppUrl } from "../../lib/whatsapp";
import { Wordmark } from "./Navbar";

export function Footer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [legal, setLegal] = useState("Aviso de privacidad");
  const openLegal = (title: string) => {
    setLegal(title);
    dialog.current?.showModal();
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Wordmark />
            <p>
              El bienestar empieza
              <br />
              con una pausa.
            </p>
          </div>
          <nav aria-label="Navegación del pie de página">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="footer-contact">
            <p className="eyebrow">Conversemos</p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp ↗
            </a>
            <a
              href={spa.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
            <span>{spa.location}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {spa.name}
          </span>
          <span className="footer-demo">Sitio demostrativo</span>
          <div>
            <button onClick={() => openLegal("Aviso de privacidad")}>
              Aviso de privacidad
            </button>
            <button onClick={() => openLegal("Términos")}>Términos</button>
          </div>
        </div>
      </div>
      <dialog
        className="legal-dialog"
        ref={dialog}
        aria-labelledby="legal-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="legal-content">
          <button
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label="Cerrar información legal"
            autoFocus
          >
            <X aria-hidden="true" />
          </button>
          <p className="eyebrow">Sitio demostrativo</p>
          <h2 id="legal-title">{legal}</h2>
          {legal === "Aviso de privacidad" ? (
            <p>
              Esta demo no incluye formularios, cuentas ni analítica propia. Los
              enlaces a WhatsApp, Instagram y Google Maps abren servicios
              externos, sujetos a sus propias políticas de privacidad. Este
              texto ilustrativo deberá sustituirse por el aviso del negocio
              antes de publicar una versión comercial.
            </p>
          ) : (
            <p>
              {spa.name} es una marca ficticia. Los tratamientos, testimonios,
              dirección y datos de contacto son ilustrativos. Esta página no
              procesa reservas ni pagos. Los datos y términos deberán ser
              revisados por el negocio antes de su uso comercial.
            </p>
          )}
          <button
            className="button button-solid"
            onClick={() => dialog.current?.close()}
          >
            Entendido
          </button>
        </div>
      </dialog>
    </footer>
  );
}
