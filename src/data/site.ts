import type { Experience, SpaImage } from "../types/site";

const image = (
  name: string,
  alt: string,
  width = 1200,
  height = 1500,
  fallbackName = name,
): SpaImage => ({
  src: `/images/${name}.jpg`,
  fallback: `/images/placeholders/${fallbackName}.svg`,
  alt,
  width,
  height,
});

export const spa = {
  name: "Savia Spa",
  wordmark: "SAVIA",
  tagline: "Wellness & Beauty",
  location: "Mazatlán, Sinaloa",
  address: "Av. del Mar 120, Zona Costera",
  addressNote: "Dirección ilustrativa. Este spa es una marca ficticia.",
  phone: "+52 669 000 0000",
  whatsapp: "526690000000",
  whatsappMessage:
    "Hola, vi la página de Savia Spa y quisiera solicitar información para reservar una experiencia.",
  instagram: "@saviaspa.mx",
  instagramUrl: "https://www.instagram.com/saviaspa.mx/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Mazatl%C3%A1n%2C%20Sinaloa",
  schedule: [
    { days: "Lunes – Viernes", hours: "9:00 AM – 7:00 PM" },
    { days: "Sábado", hours: "9:00 AM – 6:00 PM" },
    { days: "Domingo", hours: "10:00 AM – 2:00 PM" },
  ],
  images: {
    hero: image(
      "spa-espacio",
      "Un refugio de calma: interior cálido y natural de Savia Spa",
      1400,
      1700,
      "spa-hero",
    ),
    about: image(
      "spa-about",
      "Detalles naturales y texturas del espacio Savia",
      1000,
      1200,
    ),
    massage: image(
      "spa-corporal",
      "Espacio preparado para un masaje relajante",
      1200,
      900,
      "treatment-massage",
    ),
    facial: image(
      "masaje-facial",
      "Selección de productos para el ritual facial",
      1200,
      900,
      "treatment-facial",
    ),
    aromatherapy: image(
      "spa-1",
      "Esencias y aceites del ritual de aromaterapia",
      1200,
      900,
      "treatment-aromatherapy",
    ),
    body: image(
      "spa-ritual",
      "Texturas y elementos del ritual de cuidado corporal",
      1200,
      900,
      "treatment-body",
    ),
    interior1: image(
      "spa-2",
      "Sala de descanso de Savia Spa",
      1200,
      1500,
      "spa-interior-1",
    ),
    interior2: image(
      "spa-3",
      "Luz natural en la sala de tratamientos",
      1600,
      1000,
      "spa-interior-2",
    ),
    immersive: image(
      "spa-horizontal",
      "Piscina interior rodeada de plantas y luz natural en Savia Spa",
      735,
      410,
      "spa-interior-2",
    ),
    interior3: image(
      "spa-4",
      "Cerámica y detalles de nuestro espacio",
      900,
      1000,
      "spa-interior-3",
    ),
    interior4: image(
      "spa-5",
      "Un rincón sereno para hacer una pausa",
      900,
      1000,
      "spa-interior-4",
    ),
    social1: image(
      "spa-3",
      "Rituales cotidianos de bienestar",
      1000,
      1000,
      "spa-social-1",
    ),
    social2: image(
      "spa-2",
      "La belleza de las pequeñas pausas",
      1000,
      1000,
      "spa-social-2",
    ),
    social3: image(
      "spa-3",
      "Inspiración natural de Savia",
      1000,
      1000,
      "spa-social-3",
    ),
  },
};

export const navigation = [
  { label: "Inicio", href: "#inicio" },
  { label: "Experiencias", href: "#experiencias" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Galería", href: "#galeria" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Ubicación", href: "#ubicacion" },
];

export const experiences: Experience[] = [
  {
    id: "01",
    name: "Masaje relajante",
    category: "SOLTAR · DESCANSAR",
    description:
      "Libera tensión y disfruta una experiencia enfocada en recuperar calma y ligereza.",
    image: spa.images.massage,
  },
  {
    id: "02",
    name: "Ritual facial",
    category: "CUIDAR · ILUMINAR",
    description:
      "Tratamientos personalizados para cuidar, hidratar y devolver luminosidad a tu piel.",
    image: spa.images.facial,
  },
  {
    id: "03",
    name: "Aromaterapia",
    category: "RESPIRAR · CONECTAR",
    description:
      "Una experiencia sensorial que combina aromas, respiración y relajación profunda.",
    image: spa.images.aromatherapy,
  },
  {
    id: "04",
    name: "Ritual corporal",
    category: "RENOVAR · SENTIR",
    description:
      "Cuidado corporal diseñado para renovar, suavizar y reconectar contigo.",
    image: spa.images.body,
  },
];

export const benefits = [
  "Atención personalizada",
  "Ambiente relajante",
  "Profesionales especializados",
  "Productos seleccionados",
];
export const testimonials = [
  "Desde que entras se siente que todo está pensado para que desconectes.",
  "La atención fue increíble y el ambiente transmite muchísima calma.",
  "Salí sintiéndome renovada. Sin duda un lugar al que quiero volver.",
];
export const gallery = [
  spa.images.interior1,
  spa.images.interior2,
  spa.images.interior3,
  spa.images.interior4,
];
export const socialGallery = [
  spa.images.social1,
  spa.images.social2,
  spa.images.social3,
];
