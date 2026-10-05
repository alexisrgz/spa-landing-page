import { mkdirSync, writeFileSync } from "node:fs";

const output = new URL("../public/images/placeholders/", import.meta.url);
mkdirSync(output, { recursive: true });

const defs = `<defs>
  <linearGradient id="wall" x2="1" y2=".4"><stop stop-color="#e5ded0"/><stop offset="1" stop-color="#d0c5b3"/></linearGradient>
  <linearGradient id="arch" x2="1" y2=".5"><stop stop-color="#a9ac97"/><stop offset="1" stop-color="#d1d1bc"/></linearGradient>
  <linearGradient id="linen" x2="0" y2="1"><stop stop-color="#f6f2e8"/><stop offset="1" stop-color="#d9d0bd"/></linearGradient>
  <linearGradient id="ceramic" x2="1" y2=".4"><stop stop-color="#b6a48f"/><stop offset=".5" stop-color="#e3d8c6"/><stop offset="1" stop-color="#c5b49d"/></linearGradient>
  <linearGradient id="oil" x2="1" y2="0"><stop stop-color="#655f41"/><stop offset=".5" stop-color="#9b9270"/><stop offset="1" stop-color="#68664c"/></linearGradient>
  <pattern id="grain" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1" cy="2" r=".55" fill="#514e3b" opacity=".12"/><circle cx="4" cy="5" r=".6" fill="#fffdf6" opacity=".4"/></pattern>
</defs>`;

const branch = (x, y, scale = 1, color = "#6f7960") =>
  `<g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${color}" stroke-width="3"><path d="M0 240C-5 155 20 60 45-60M12 148C-30 112-47 68-52 34M24 87C74 65 97 25 110-8M32 20C4-1-2-38-9-66"/><g fill="${color}" stroke="none"><ellipse cx="-32" cy="85" rx="12" ry="35" transform="rotate(-35 -32 85)"/><ellipse cx="-48" cy="40" rx="11" ry="31" transform="rotate(-20 -48 40)"/><ellipse cx="75" cy="51" rx="12" ry="36" transform="rotate(43 75 51)"/><ellipse cx="102" cy="9" rx="10" ry="30" transform="rotate(28 102 9)"/><ellipse cx="-3" cy="-33" rx="10" ry="30" transform="rotate(-22 -3 -33)"/><ellipse cx="40" cy="-20" rx="10" ry="34" transform="rotate(13 40 -20)"/><ellipse cx="2" cy="153" rx="11" ry="33" transform="rotate(-45 2 153)"/></g></g>`;

const bottle = (x, y, scale = 1) =>
  `<g transform="translate(${x} ${y}) scale(${scale})"><rect x="30" y="0" width="54" height="52" rx="7" fill="#575c4b"/><rect x="18" y="45" width="78" height="25" rx="8" fill="#898c71"/><rect x="0" y="62" width="115" height="195" rx="21" fill="url(#oil)"/><rect x="12" y="110" width="91" height="96" rx="1" fill="#e7dfcc"/><text x="58" y="149" fill="#5b604e" font-size="15" font-family="Georgia,serif" text-anchor="middle" letter-spacing="3">SAVIA</text><path d="M37 167H78M43 176H71" stroke="#a6a28c"/><path d="M10 82V225" stroke="#efedd6" opacity=".3" stroke-width="4"/></g>`;

const towel = (x, y, scale = 1) =>
  `<g transform="translate(${x} ${y}) scale(${scale})"><rect x="0" y="42" width="360" height="74" rx="22" fill="#ded5c2"/><rect x="-8" y="0" width="360" height="75" rx="23" fill="url(#linen)"/><path d="M14 57H326M21 99H333" fill="none" stroke="#bdb7a3" stroke-width="2" opacity=".7"/><path d="M24 8V55M34 8V55M299 8V55M309 8V55" stroke="#c8bfac" opacity=".7"/></g>`;

function room(variant = 0) {
  const shift = variant % 2 ? 70 : 0;
  return `<rect width="1000" height="1200" fill="url(#wall)"/>
  <path d="M0 850H1000V1200H0Z" fill="#c6b9a3"/><path d="M0 850H1000M500 850L170 1200M790 850L965 1200M0 1080H1000" stroke="#b6aa96" fill="none"/>
  <path d="M${210 + shift} 860V365A245 245 0 0 1 ${700 + shift} 365V860Z" fill="#bfb5a0"/>
  <path d="M${234 + shift} 860V366A222 222 0 0 1 ${678 + shift} 366V860Z" fill="url(#arch)"/>
  <path d="M${267 + shift} 860V380A190 190 0 0 1 ${647 + shift} 380V860Z" fill="#d4d4bd"/>
  <path d="M${287 + shift} 860V385A170 170 0 0 1 ${627 + shift} 385V860Z" fill="url(#arch)"/>
  <path d="M${458 + shift} 218V858M${287 + shift} 497H${627 + shift}" stroke="#e9e4d1" stroke-width="8"/>
  <path d="M0 120L210 60V850L0 1050Z" fill="#f5edd9" opacity=".3"/>
  <path d="M700 360L1000 615V1100L700 855Z" fill="#f6f0df" opacity=".22"/>
  <ellipse cx="501" cy="970" rx="340" ry="48" fill="#968e78" opacity=".18"/>
  <rect x="180" y="791" width="610" height="120" rx="4" fill="#a49980"/><rect x="207" y="899" width="40" height="106" fill="#9c9077"/><rect x="717" y="899" width="40" height="106" fill="#9c9077"/>
  <path d="M165 792Q165 758 200 752H764Q801 753 804 790V865H165Z" fill="url(#linen)"/>
  <path d="M533 754H687V956Q611 974 533 953Z" fill="#a3a58c"/><path d="M546 765V945M560 765V951M669 765V953" stroke="#8f947d" opacity=".5"/>
  ${towel(225, 693, 0.55)}
  <ellipse cx="883" cy="1027" rx="67" ry="17" fill="#aaa08a" opacity=".3"/><path d="M843 876H915L904 1018Q876 1038 852 1018Z" fill="url(#ceramic)"/>
  ${branch(870, 680, 0.85)}
  <path d="M95 0V380" stroke="#8e8873" stroke-width="2"/><ellipse cx="95" cy="398" rx="50" ry="30" fill="#eae1cb"/><ellipse cx="95" cy="414" rx="46" ry="12" fill="#c9bda4"/>
  <rect width="1000" height="1200" fill="url(#grain)"/>`;
}

function stillLife(variant) {
  const sage = variant % 3 === 1;
  return `<rect width="1200" height="900" fill="${sage ? "#dce0d3" : "#e9e0d1"}"/>
  <path d="M0 0H400L1000 900H650Z" fill="#f9f5e9" opacity=".45"/><path d="M920 0H1200V900H1050L510 0Z" fill="#a9a28b" opacity=".09"/>
  <path d="M0 680H1200V900H0Z" fill="${sage ? "#c6ccbb" : "#d5c8b2"}"/><path d="M0 680H1200" stroke="#bbb29b" opacity=".5"/>
  <ellipse cx="665" cy="744" rx="410" ry="45" fill="#6d705b" opacity=".1"/>
  ${variant === 0 || variant === 3 ? towel(260, 555, 1.35) : towel(610, 598, 0.83)}
  ${variant === 1 ? `<ellipse cx="469" cy="611" rx="151" ry="38" fill="#c1b49c"/><path d="M318 608Q330 730 467 735Q600 730 620 608Z" fill="url(#ceramic)"/><ellipse cx="469" cy="607" rx="145" ry="28" fill="#d9d1be"/>` : bottle(variant === 3 ? 820 : 380, variant === 2 ? 362 : 402, variant === 2 ? 1.25 : 1)}
  ${variant === 2 ? bottle(577, 474, 0.87) : ""}
  ${variant === 0 ? bottle(785, 485, 0.8) : ""}
  <path d="M${sage ? 190 : 895} 585H${sage ? 300 : 1005}L${sage ? 285 : 990} 718Q${sage ? 245 : 950} 742 ${sage ? 205 : 910} 718Z" fill="url(#ceramic)"/>
  ${branch(sage ? 237 : 942, 350, 1)}
  <rect width="1200" height="900" fill="url(#grain)"/>`;
}

const assets = [
  ["spa-hero", "IMAGEN DEL SPA", "room", 0],
  ["spa-about", "LOS PEQUEÑOS DETALLES", "still", 1],
  ["treatment-massage", "RITUAL DE CALMA", "still", 0],
  ["treatment-facial", "RITUAL FACIAL", "still", 1],
  ["treatment-aromatherapy", "ESENCIAS NATURALES", "still", 2],
  ["treatment-body", "CUIDADO CORPORAL", "still", 3],
  ["spa-interior-1", "NUESTRO REFUGIO", "room", 1],
  ["spa-interior-2", "LUZ Y CALMA", "room", 0],
  ["spa-interior-3", "TEXTURAS NATURALES", "still", 1],
  ["spa-interior-4", "UN MOMENTO PARA TI", "still", 0],
  ["spa-social-1", "EL ARTE DE CUIDARTE", "still", 2],
  ["spa-social-2", "A TU RITMO", "room", 1],
  ["spa-social-3", "NATURALMENTE SAVIA", "still", 3],
];

for (const [name, label, type, variant] of assets) {
  const [width, height] = type === "room" ? [1000, 1200] : [1200, 900];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Ilustración de referencia: ${label.toLowerCase()}">${defs}${type === "room" ? room(variant) : stillLife(variant)}<text x="${width / 2}" y="${height - 38}" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" letter-spacing="3" fill="#605f50">${label} · SAVIA</text></svg>`;
  writeFileSync(new URL(`${name}.svg`, output), svg);
}
console.log(`Created ${assets.length} local SVG placeholders.`);
