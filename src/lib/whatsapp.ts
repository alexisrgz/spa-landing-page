import { spa } from "../data/site";

export function getWhatsAppUrl(experience?: string) {
  const message = experience
    ? `${spa.whatsappMessage} Me interesa: ${experience}.`
    : spa.whatsappMessage;
  return `https://wa.me/${spa.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
