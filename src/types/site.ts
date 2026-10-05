export interface SpaImage {
  src: string;
  fallback: string;
  alt: string;
  width: number;
  height: number;
}

export interface Experience {
  id: string;
  name: string;
  category: string;
  description: string;
  image: SpaImage;
}
