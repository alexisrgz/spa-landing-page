import { useState } from "react";
import availableImages from "virtual:spa-images";
import type { SpaImage } from "../../types/site";

interface Props {
  image: SpaImage;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function ImageWithFallback({
  image,
  className = "",
  priority = false,
  sizes = "(max-width: 767px) 100vw, 50vw",
}: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const isFallback =
    !availableImages.includes(image.src) || failedSrc === image.src;

  return (
    <img
      className={`spa-image ${className}`}
      src={isFallback ? image.fallback : image.src}
      alt={isFallback ? `Ilustración de referencia: ${image.alt}` : image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={isFallback ? undefined : () => setFailedSrc(image.src)}
      data-fallback={isFallback}
    />
  );
}
