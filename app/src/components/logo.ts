/**
 * Brand mark for Pulaagu / Calendrier Fulfulde.
 *
 * Concept: a crescent moon embracing a rising sun disc, with a stylized
 * zebu silhouette standing on a horizon line — Sahelian pastoral tradition
 * + Islamic celestial heritage in a single mark.
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
          <circle cx="26" cy="30" r="17" fill="white"/>
          <circle cx="33" cy="28" r="14.5" fill="black"/>
        </mask>
        <linearGradient id="logo-horizon" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#d4af37" stop-opacity="0"/>
          <stop offset="50%" stop-color="#d4af37" stop-opacity="1"/>
          <stop offset="100%" stop-color="#d4af37" stop-opacity="0"/>
        </linearGradient>
      </defs>

      <!-- Rounded dark square background with a subtle gold border -->
      <rect width="64" height="64" rx="14" fill="url(#logo-bg)"/>
      <rect x="0.5" y="0.5" width="63" height="63" rx="13.5" fill="none"
            stroke="#d4af37" stroke-opacity="0.35"/>

      <!-- Crescent moon -->
      <rect width="64" height="64" fill="url(#logo-moon)" mask="url(#logo-crescent)"/>

      <!-- Small sun disc tucked in the crescent's hollow -->
      <circle cx="38" cy="29" r="4.5" fill="url(#logo-sun)"/>

      <!-- Star accents (5 tiny stars at varied opacities, scattered in the night sky) -->
      <circle cx="14" cy="14" r="0.9" fill="#f5e09a"/>
      <circle cx="50" cy="50" r="0.7" fill="#f5e09a" opacity="0.7"/>
      <circle cx="20" cy="50" r="0.5" fill="#ffffff" opacity="0.6"/>
      <circle cx="55" cy="20" r="0.7" fill="#ffffff" opacity="0.5"/>
      <circle cx="10" cy="32" r="0.5" fill="#f5e09a" opacity="0.6"/>
      <circle cx="48" cy="36" r="0.4" fill="#ffffff" opacity="0.45"/>
      <!-- Small 4-point sparkle near the sun -->
      <path d="M44 18 l0.4 1.3 1.3 0.4 -1.3 0.4 -0.4 1.3 -0.4-1.3 -1.3-0.4 1.3-0.4 z"
            fill="#f5e09a" opacity="0.85"/>

      <!-- Horizon line under the celestial scene -->
      <line x1="6" y1="50" x2="58" y2="50" stroke="url(#logo-horizon)" stroke-width="0.8"/>

      <!-- Tiny zebu silhouette walking the horizon (left side) -->
      <g opacity="0.9">
        <!-- Body -->
        <path d="M16 47
                 c-0.6-0.5-1-1-1-1.8
                 c0-0.7 0.5-1.2 1-1.2 h0.5
                 l0.3-0.8 c0-0.5 0.5-0.8 1-0.8 h5.5
                 c0.8 0 1.3 0.3 1.5 1
                 l0.8 1.3
                 c0 0.5-0.3 1-0.8 1
                 l-0.5 0.3 v1.5
                 M16 47 v2 M18 47 v2 M22 47 v2 M24 47 v2"
              stroke="#d4af37" stroke-width="0.8" fill="none" stroke-linecap="round"/>
        <!-- Horns -->
        <path d="M17.5 43.8 q-1-1.5-2.2-1.7 M22 43.8 q1-1.5 2.2-1.7"
              stroke="#d4af37" stroke-width="0.7" fill="none" stroke-linecap="round"/>
        <!-- Hump -->
        <path d="M18.5 43.5 q0.8-1.2 2-1.2 q1.2 0 2 1.2"
              stroke="#d4af37" stroke-width="0.7" fill="none" stroke-linecap="round"/>
        <!-- Tail -->
        <path d="M24.3 45.3 q1 0.5 1 1.5"
              stroke="#d4af37" stroke-width="0.6" fill="none" stroke-linecap="round"/>
      </g>

      <!-- Acacia silhouette on the right side (umbrella canopy + thin trunk) -->
      <g opacity="0.85">
        <!-- Canopy -->
        <path d="M37 45 q2-6 9-6 q7 0 9 6 q-4-1.5-9-1.5 q-5 0-9 1.5 z"
              fill="#d4af37" stroke="none"/>
        <!-- Trunk -->
        <path d="M46 45 v5"
              stroke="#d4af37" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <!-- Foliage stippling -->
        <path d="M40 44 q0.6-2 2-2.5 M46 43 q0.6-2.5 2-3 M51 44 q0.6-2 2-2.5"
              stroke="#d4af37" stroke-width="0.5" fill="none" stroke-linecap="round" opacity="0.7"/>
      </g>
    </svg>
  `;
}

/** Mount the logo into a host element. */
export function mountLogo(hostId: string, size = 32): void {
  const host = document.getElementById(hostId);
  if (!host) return;
  host.innerHTML = logoSvg(size);
}
