import { ArrowUpRight, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "../../lib/whatsapp";

export function WhatsAppButton({
  children = "Reservar por WhatsApp",
  variant = "solid",
  className = "",
  experience,
}: {
  children?: React.ReactNode;
  variant?: "solid" | "light" | "text";
  className?: string;
  experience?: string;
}) {
  return (
    <a
      className={`${variant === "text" ? "text-link" : `button button-${variant}`} ${className}`}
      href={getWhatsAppUrl(experience)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}

export function FloatingWhatsApp({ visible }: { visible: boolean }) {
  return (
    <a
      className={`floating-whatsapp ${visible ? "is-visible" : ""}`}
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reservar por WhatsApp (abre una pestaña nueva)"
      title="Reserva por WhatsApp"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <MessageCircle size={22} strokeWidth={1.5} aria-hidden="true" />
      <span>Reserva por WhatsApp</span>
    </a>
  );
}
