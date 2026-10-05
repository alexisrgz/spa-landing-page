import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  children,
  id,
}: {
  eyebrow: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{children}</h2>
    </div>
  );
}
