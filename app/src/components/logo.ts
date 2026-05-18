/**
 * Brand mark for Pulaagu / Calendrier Fulfulde.
 *
 * Concept: a crescent moon embracing a rising sun disc, with a stylized
 * zebu silhouette standing on a horizon line — Sahelian pastoral tradition
 * + Islamic celestial heritage in a single mark.
 */

export function logoSvg(size = 32): string {
  return `
    <img src="/logo.gif" alt="Pulaagu logo" width="${size}" height="${size}" style="border-radius: 14px;">
  `;
}

/** Mount the logo into a host element. */
export function mountLogo(hostId: string, size = 32): void {
  const host = document.getElementById(hostId);
  if (!host) return;
  host.innerHTML = logoSvg(size);
}
