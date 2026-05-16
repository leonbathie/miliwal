/**
 * Cultural Pulaagu illustrations — hand-drawn SVG silhouettes of objects
 * central to Fulani pastoral life.
 *
 * Each illustration uses `currentColor` for stroke/fill so it inherits the
 * theme's accent palette. Sized in a wide viewBox so they compose naturally
 * in scenes. Pure inline SVG — no external assets, fully offline-compatible.
 */

export type IllustrationName =
  | 'zebu'        // long-horned Sahelian cattle (vache zébu)
  | 'sheep'       // West African hair sheep (mouton peul / balami)
  | 'acacia'      // umbrella-canopy savanna tree
  | 'calabash'    // gourd milk container (calebasse)
  | 'peulhat'     // traditional conical straw hat (chapeau peul)
  | 'herder'      // pastor with staff
  | 'millet'      // millet / sorghum ear (mil, sorgho)
  | 'crescent'    // crescent + star (cultural celestial)
  | 'pastoral'    // composed scene: tree + sun + zebu
  | 'pattern'     // repeating diamond textile motif
  | 'mortier'     // wooden mortar + pestle for pounding millet (gusal)
  | 'teapot'      // Sahelian tea pot for the three rounds of attaya
  | 'tama'        // hourglass talking drum
  | 'marmite'     // earthen cooking pot
  | 'jewelry';    // silver hoop earrings worn by Fulani women

const COMMON_ATTRS =
  'xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" ' +
  'stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"';

/* -------------------------------------------------------------------------- */
/*  Individual silhouettes                                                    */
/* -------------------------------------------------------------------------- */

const ZEBU = `
  <!-- Sahelian zebu: long horns, prominent hump, dewlap, slender legs -->
  <path d="M14 36
           c-2-2-3-4-3-7
           c0-3 2-5 4-5 h2
           l1-3 c0-2 2-3 4-3 h22
           c3 0 5 1 6 4
           l3 5
           c0 2-1 4-3 4
           l-2 1 v6
           m-30-1 v6 m6-6 v6 m12-6 v6 m6-6 v6"/>
  <!-- Long curved horns -->
  <path d="M21 18 q-4-6-9-7 m9 7 q-2-7 0-10
           M37 18 q4-6 9-7 m-9 7 q2-7 0-10"/>
  <!-- Hump -->
  <path d="M27 18 q3-5 8-5 q5 0 8 5"/>
  <!-- Eye -->
  <circle cx="19" cy="22" r="0.6" fill="currentColor" stroke="none"/>
  <!-- Tail -->
  <path d="M48 22 q3 2 3 5 q-1 2-3 2"/>
`;

const SHEEP = `
  <!-- West African hair sheep: rounded body, hanging ears, modest curl -->
  <path d="M14 32
           c-2-2-3-4-3-7
           c0-3 2-5 4-5
           c1-3 4-5 8-5 h12
           c4 0 7 2 8 5
           c2 0 4 2 4 5
           c0 3-1 5-3 7
           m-30 0 v4 m6-4 v4 m12-4 v4 m6-4 v4"/>
  <!-- Hanging ears (West African breed) -->
  <path d="M20 16 q-3 4-4 8 M40 16 q3 4 4 8"/>
  <!-- Wool/forehead detail -->
  <path d="M24 17 q4-4 12 0"/>
  <!-- Eye -->
  <circle cx="22" cy="21" r="0.6" fill="currentColor" stroke="none"/>
`;

const ACACIA = `
  <!-- Iconic Sahel umbrella canopy on a thin trunk -->
  <path d="M6 22 q3-12 26-12 q23 0 26 12 q-12-4-26-4 q-14 0-26 4 z"
        stroke="currentColor" stroke-width="1.2"/>
  <!-- Foliage stippling -->
  <path d="M14 22 q1-4 4-5 M22 22 q1-5 4-6 M32 22 q1-5 4-6 M42 22 q1-4 4-5"/>
  <!-- Trunk -->
  <path d="M30 22 v18 M30 28 q-2 3-5 4 M30 32 q3 3 6 4"/>
  <!-- Ground line -->
  <path d="M8 40 h44" stroke-dasharray="2 3"/>
`;

const CALABASH = `
  <!-- Gourd with decorative band -->
  <path d="M30 8 q-2 0-3 2 v3 q0 1-2 1 q-7 1-10 8 q-3 7 1 14 q4 8 14 8
           q10 0 14-8 q4-7 1-14 q-3-7-10-8 q-2 0-2-1 v-3 q-1-2-3-2 z"/>
  <!-- Neck rings -->
  <path d="M27 11 h6 M27 14 h6"/>
  <!-- Decorative pattern band -->
  <path d="M19 28 h22 M19 30 h22"/>
  <path d="M23 28 l2 2 M27 28 l2 2 M31 28 l2 2 M35 28 l2 2"/>
`;

const PEULHAT = `
  <!-- Wide conical straw hat with tassel -->
  <path d="M30 6 q-1 0-2 1 l-20 18 q-1 1 0 2 q2 2 22 2 q20 0 22-2 q1-1 0-2 l-20-18 q-1-1-2-1 z"/>
  <!-- Weave lines -->
  <path d="M14 20 q16-6 32 0 M16 24 q14-4 28 0 M18 27 q12-3 24 0"/>
  <!-- Top tassel -->
  <path d="M30 6 v-3 M28 4 l4 0"/>
  <!-- Chin strap shadow -->
  <path d="M22 28 q8 6 16 0" stroke-dasharray="2 2"/>
`;

const HERDER = `
  <!-- Standing pastor with long staff (gandal) -->
  <!-- Head -->
  <circle cx="30" cy="10" r="4"/>
  <!-- Body & flowing boubou -->
  <path d="M27 14 q-3 1-3 4 v22 l-2 6 h16 l-2-6 v-22 q0-3-3-4"/>
  <!-- Arm holding staff -->
  <path d="M33 18 q4 2 4 6 v18"/>
  <!-- Staff -->
  <path d="M37 6 v40" stroke-dasharray="0"/>
  <!-- Ground -->
  <path d="M14 46 h32"/>
`;

const MILLET = `
  <!-- Ear of millet / sorghum on a long stem -->
  <path d="M20 6 q-3 6-3 14 q0 6 3 10 q3-4 3-10 q0-8-3-14 z"/>
  <!-- Grain detail -->
  <path d="M18 11 l4 0 M17 14 l6 0 M17 17 l6 0 M18 20 l4 0 M19 23 l2 0"/>
  <!-- Stem & leaf -->
  <path d="M20 30 v18 M20 36 q4-2 8-1 M20 40 q-4-2-8-1"/>
`;

const CRESCENT = `
  <!-- Crescent moon embracing a five-pointed star -->
  <path d="M22 8 a16 16 0 1 0 0 32 a13 13 0 1 1 0-32 z"/>
  <path d="M38 18 l1.5 4 4.5 0 -3.5 3 1.5 4 -3.5-2.5 -3.5 2.5 1.5-4 -3.5-3 4.5 0 z"
        stroke-width="1"/>
`;

/* -------------------------------------------------------------------------- */
/*  Composed scene                                                            */
/* -------------------------------------------------------------------------- */

const PASTORAL = `
  <!-- Sun -->
  <circle cx="160" cy="22" r="10" stroke-width="1"/>
  <path d="M160 6 v6 M160 32 v6 M176 22 h6 M138 22 h6
           M171 11 l4-4 M145 33 l4-4 M171 33 l4 4 M145 11 l-4-4"
        stroke-width="0.8"/>
  <!-- Acacia (background, left) -->
  <g transform="translate(8 32) scale(0.85)" opacity="0.7" stroke-width="1">
    <path d="M0 14 q3-10 22-10 q19 0 22 10 q-10-3-22-3 q-12 0-22 3 z"/>
    <path d="M22 14 v18"/>
  </g>
  <!-- Zebu silhouette (foreground) -->
  <g transform="translate(82 38)" stroke-width="1.2">
    <path d="M14 30 c-2-2-3-4-3-7 c0-3 2-5 4-5 h2 l1-3 c0-2 2-3 4-3 h22
             c3 0 5 1 6 4 l3 5 c0 2-1 4-3 4 l-2 1 v6
             m-30-1 v6 m6-6 v6 m12-6 v6 m6-6 v6"/>
    <path d="M21 12 q-4-6-9-7 M37 12 q4-6 9-7"/>
    <path d="M27 12 q3-5 8-5 q5 0 8 5"/>
    <circle cx="19" cy="16" r="0.6" fill="currentColor" stroke="none"/>
    <path d="M48 16 q3 2 3 5 q-1 2-3 2"/>
  </g>
  <!-- Ground -->
  <path d="M0 76 L200 76" stroke-dasharray="3 4" opacity="0.5"/>
`;

/* -------------------------------------------------------------------------- */
/*  Repeating textile pattern (diamond / triangle motif)                      */
/* -------------------------------------------------------------------------- */

const MORTIER = `
  <!-- Wooden mortar (gusal) and pestle for pounding millet -->
  <!-- Mortar -->
  <path d="M16 22 q-2 0-2 2 v8 q0 8 6 14 q3 4 10 4 q7 0 10-4 q6-6 6-14 v-8 q0-2-2-2 z"/>
  <!-- Inner well -->
  <ellipse cx="30" cy="24" rx="14" ry="2.5"/>
  <!-- Decorative bands -->
  <path d="M19 34 h22 M19 38 h22"/>
  <!-- Pestle leaning out -->
  <path d="M42 6 l8 14" stroke-width="2"/>
  <path d="M50 20 q-1 1-2 1.5 q-2-1.5-1-3 l1-1.5 q1.5-1.5 3 0 q1 1.5 0 3 z"/>
`;

const TEAPOT = `
  <!-- Sahelian tea pot for attaya (3-round Maghrebi-style tea) -->
  <!-- Body (round teapot) -->
  <path d="M18 22 q0-6 6-7 h12 q6 1 6 7
           q2 1 2 4 v8
           q0 4-3 6 h-22
           q-3-2-3-6 v-8
           q0-3 2-4 z"/>
  <!-- Lid + handle on top -->
  <path d="M24 15 h12 M28 12 h4 M30 12 v-3 M28 9 h4"/>
  <!-- Long curved spout -->
  <path d="M16 26 q-6-1-8 4 q-1 4 4 6" stroke-linecap="round"/>
  <!-- Handle on the right -->
  <path d="M44 26 q4-1 4 4 q0 5-4 6"/>
  <!-- Steam rising -->
  <path d="M30 8 q-1-2 1-4 q2-2 0-4 M34 9 q-1-2 1-3" stroke-dasharray="0" opacity="0.6"/>
`;

const TAMA = `
  <!-- Hourglass-shaped talking drum (tama) with side strings -->
  <!-- Top head -->
  <ellipse cx="30" cy="10" rx="10" ry="3"/>
  <!-- Bottom head -->
  <ellipse cx="30" cy="42" rx="10" ry="3"/>
  <!-- Body sides -->
  <path d="M20 10 q-2 10 0 16 q2 6 0 16 M40 10 q2 10 0 16 q-2 6 0 16"/>
  <!-- Tension cords running side-to-side -->
  <path d="M22 12 l16 30 M38 12 l-16 30 M22 22 l16 8 M22 30 l16-8" stroke-width="0.8"/>
  <!-- Drumstick -->
  <path d="M48 6 l8 12" stroke-width="1.8" stroke-linecap="round"/>
  <circle cx="48" cy="6" r="1.5" fill="currentColor" stroke="none"/>
`;

const MARMITE = `
  <!-- Earthen cooking pot with handles, sitting on three stones -->
  <!-- Pot body -->
  <path d="M14 22 q0-3 4-3 h24 q4 0 4 3 v6 q0 8-4 14 q-2 2-12 2 q-10 0-12-2 q-4-6-4-14 z"/>
  <!-- Rim -->
  <path d="M13 22 h34 M14 26 h32"/>
  <!-- Left & right handles -->
  <path d="M14 26 q-3 2-3 4 q0 2 3 2 M46 26 q3 2 3 4 q0 2-3 2"/>
  <!-- Three hearth stones below -->
  <path d="M14 46 q-2-1-2-3 q0-2 2-3 q2 1 2 3 q0 2-2 3 z"/>
  <path d="M30 46 q-2-1-2-3 q0-2 2-3 q2 1 2 3 q0 2-2 3 z"/>
  <path d="M46 46 q-2-1-2-3 q0-2 2-3 q2 1 2 3 q0 2-2 3 z"/>
  <!-- Steam -->
  <path d="M22 12 q-1-2 1-4 M30 10 q-1-3 1-5 M38 12 q-1-2 1-4" opacity="0.6"/>
`;

const JEWELRY = `
  <!-- Pair of large silver hoop earrings (kwottenndi) -->
  <!-- Left earring -->
  <circle cx="20" cy="26" r="11" stroke-width="2"/>
  <circle cx="20" cy="26" r="7" stroke-width="0.7" opacity="0.7"/>
  <!-- Top loop -->
  <path d="M18 15 q2-3 4 0"/>
  <!-- Hammered detail dots -->
  <circle cx="13" cy="22" r="0.6" fill="currentColor" stroke="none"/>
  <circle cx="13" cy="30" r="0.6" fill="currentColor" stroke="none"/>
  <circle cx="27" cy="22" r="0.6" fill="currentColor" stroke="none"/>
  <circle cx="27" cy="30" r="0.6" fill="currentColor" stroke="none"/>
  <!-- Right earring -->
  <circle cx="44" cy="26" r="11" stroke-width="2"/>
  <circle cx="44" cy="26" r="7" stroke-width="0.7" opacity="0.7"/>
  <path d="M42 15 q2-3 4 0"/>
  <circle cx="37" cy="22" r="0.6" fill="currentColor" stroke="none"/>
  <circle cx="37" cy="30" r="0.6" fill="currentColor" stroke="none"/>
  <circle cx="51" cy="22" r="0.6" fill="currentColor" stroke="none"/>
  <circle cx="51" cy="30" r="0.6" fill="currentColor" stroke="none"/>
`;

const PATTERN = `
  <pattern id="fulani-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
    <!-- Diamond -->
    <path d="M20 4 L36 20 L20 36 L4 20 Z" fill="none" stroke="currentColor"
          stroke-width="0.8" opacity="0.5"/>
    <!-- Inner diamond -->
    <path d="M20 12 L28 20 L20 28 L12 20 Z" fill="currentColor" opacity="0.12"/>
    <!-- Corner triangles -->
    <path d="M0 0 L4 0 L0 4 Z M40 0 L36 0 L40 4 Z M0 40 L0 36 L4 40 Z M40 40 L36 40 L40 36 Z"
          fill="currentColor" opacity="0.18"/>
    <!-- Center dot -->
    <circle cx="20" cy="20" r="0.9" fill="currentColor" opacity="0.4"/>
  </pattern>
  <rect width="100%" height="100%" fill="url(#fulani-pattern)"/>
`;

/* -------------------------------------------------------------------------- */
/*  Public API                                                                */
/* -------------------------------------------------------------------------- */

interface IllustrationDef {
  viewBox: string;
  body: string;
  defaultStrokeWidth?: string;
}

const ILLUSTRATIONS: Record<IllustrationName, IllustrationDef> = {
  zebu:     { viewBox: '0 0 60 50',   body: ZEBU },
  sheep:    { viewBox: '0 0 60 45',   body: SHEEP },
  acacia:   { viewBox: '0 0 60 45',   body: ACACIA },
  calabash: { viewBox: '0 0 60 50',   body: CALABASH },
  peulhat:  { viewBox: '0 0 60 35',   body: PEULHAT },
  herder:   { viewBox: '0 0 60 50',   body: HERDER },
  millet:   { viewBox: '0 0 40 50',   body: MILLET },
  crescent: { viewBox: '0 0 50 50',   body: CRESCENT },
  pastoral: { viewBox: '0 0 200 80',  body: PASTORAL },
  pattern:  { viewBox: '0 0 200 200', body: PATTERN },
  mortier:  { viewBox: '0 0 60 50',   body: MORTIER },
  teapot:   { viewBox: '0 0 60 50',   body: TEAPOT },
  tama:     { viewBox: '0 0 60 50',   body: TAMA },
  marmite:  { viewBox: '0 0 60 50',   body: MARMITE },
  jewelry:  { viewBox: '0 0 60 50',   body: JEWELRY },
};

/** Return an inline SVG string for the given illustration. */
export function illustration(
  name: IllustrationName,
  options: { width?: number | string; height?: number | string; className?: string } = {},
): string {
  const def = ILLUSTRATIONS[name];
  if (!def) return '';
  const w = options.width != null ? ` width="${options.width}"` : '';
  const h = options.height != null ? ` height="${options.height}"` : '';
  const c = options.className ? ` class="${options.className}"` : '';
  return `<svg ${COMMON_ATTRS} viewBox="${def.viewBox}"${w}${h}${c} aria-hidden="true">${def.body}</svg>`;
}

/** Hydrate placeholder elements with their illustrations.
 *  Looks for `[data-illustration="name"]` and fills with the SVG. */
export function hydrateIllustrations(): void {
  document.querySelectorAll<HTMLElement>('[data-illustration]').forEach((el) => {
    if (el.firstElementChild) return; // already hydrated
    const name = el.dataset.illustration as IllustrationName | undefined;
    if (!name) return;
    el.innerHTML = illustration(name);
  });
}
