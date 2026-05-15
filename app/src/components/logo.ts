/**
 * Brand mark for Pulaagu / Calendrier Fulfulde.
 *
 * Concept: a crescent moon embracing a rising sun disc — universal celestial
 * symbol that bridges Islamic heritage and Sahelian pastoral culture, two
 * pillars of the target audience.
 */

export function logoSvg(size = 32): string {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}" aria-label="Pulaagu logo">
      <defs>
        <linearGradient id="logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1d2236"/>
          <stop offset="100%" stop-color="#0a0b14"/>
        </linearGradient>
        <linearGradient id="logo-moon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5e09a"/>
          <stop offset="100%" stop-color="#b89a3d"/>
        </linearGradient>
        <radialGradient id="logo-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f5e09a"/>
          <stop offset="100%" stop-color="#d4af37"/>
        </radialGradient>
        <mask id="logo-crescent">
          <rect width="64" height="64" fill="black"/>
          <circle cx="26" cy="32" r="18" fill="white"/>
          <circle cx="34" cy="30" r="16" fill="black"/>
        </mask>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#logo-bg)"/>
      <rect x="0.5" y="0.5" width="63" height="63" rx="13.5" fill="none" stroke="#d4af37" stroke-opacity="0.35"/>
      <!-- Crescent moon -->
      <rect width="64" height="64" fill="url(#logo-moon)" mask="url(#logo-crescent)"/>
      <!-- Small sun disc tucked in the crescent's hollow -->
      <circle cx="40" cy="32" r="4.5" fill="url(#logo-sun)"/>
      <!-- Star accents -->
      <circle cx="14" cy="16" r="0.9" fill="#f5e09a"/>
      <circle cx="50" cy="50" r="0.7" fill="#f5e09a" opacity="0.7"/>
      <circle cx="20" cy="50" r="0.5" fill="#ffffff" opacity="0.6"/>
    </svg>
  `;
}

/** Mount the logo into a host element. */
export function mountLogo(hostId: string, size = 32): void {
  const host = document.getElementById(hostId);
  if (!host) return;
  host.innerHTML = logoSvg(size);
}
