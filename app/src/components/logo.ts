/**
 * Brand mark for Pulaagu / Calendrier Fulfulde.
 *
 * Concept: a crescent moon embracing a rising sun disc, with a stylized
 * zebu silhouette standing on a horizon line — Sahelian pastoral tradition
 * + Islamic celestial heritage in a single mark.
 */

export function logoSvg(size = 32): string {
  // @ts-ignore: Bypass TS error on import.meta.env for the CI build
  const baseUrl = (import.meta as any).env?.BASE_URL ?? '/';
  return `
    <img class="brand-logo-img" src="${baseUrl}logo.webp" alt="Pulaagu logo" width="${size}" height="${size}">
  `;
}

/** Mount the logo into a host element. */
export function mountLogo(hostId: string, size = 32): void {
  const host = document.getElementById(hostId);
  if (!host) return;
  host.innerHTML = logoSvg(size);
}
