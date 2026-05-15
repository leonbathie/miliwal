export interface BrightStar {
  name: string;
  ra: number;   // hours (0..24)
  dec: number;  // degrees (-90..90)
  mag: number;  // visual magnitude (smaller = brighter)
  constellation: string; // IAU 3-letter code
}

/**
 * The 30 brightest stars visible from Earth (excluding the Sun).
 * Coordinates are J2000 equatorial, magnitudes are V-band approximations.
 * Source: IAU-approved star names + Hipparcos catalogue (rounded).
 */
export const BRIGHT_STARS: BrightStar[] = [
  { name: 'Sirius',       ra: 6.752,  dec: -16.72, mag: -1.46, constellation: 'CMa' },
  { name: 'Canopus',      ra: 6.399,  dec: -52.70, mag: -0.74, constellation: 'Car' },
  { name: 'Arcturus',     ra: 14.261, dec:  19.18, mag: -0.05, constellation: 'Boo' },
  { name: 'Rigil Kent.',  ra: 14.660, dec: -60.83, mag: -0.01, constellation: 'Cen' },
  { name: 'Vega',         ra: 18.616, dec:  38.78, mag:  0.03, constellation: 'Lyr' },
  { name: 'Capella',      ra: 5.278,  dec:  45.998, mag: 0.08, constellation: 'Aur' },
  { name: 'Rigel',        ra: 5.242,  dec:  -8.20, mag:  0.13, constellation: 'Ori' },
  { name: 'Procyon',      ra: 7.655,  dec:   5.22, mag:  0.34, constellation: 'CMi' },
  { name: 'Achernar',     ra: 1.629,  dec: -57.24, mag:  0.46, constellation: 'Eri' },
  { name: 'Bételgeuse',   ra: 5.919,  dec:   7.41, mag:  0.45, constellation: 'Ori' },
  { name: 'Hadar',        ra: 14.064, dec: -60.37, mag:  0.61, constellation: 'Cen' },
  { name: 'Altair',       ra: 19.846, dec:   8.87, mag:  0.76, constellation: 'Aql' },
  { name: 'Acrux',        ra: 12.443, dec: -63.10, mag:  0.77, constellation: 'Cru' },
  { name: 'Aldébaran',    ra: 4.598,  dec:  16.51, mag:  0.85, constellation: 'Tau' },
  { name: 'Antarès',      ra: 16.490, dec: -26.43, mag:  1.09, constellation: 'Sco' },
  { name: 'Spica',        ra: 13.420, dec: -11.16, mag:  1.04, constellation: 'Vir' },
  { name: 'Pollux',       ra: 7.755,  dec:  28.03, mag:  1.14, constellation: 'Gem' },
  { name: 'Fomalhaut',    ra: 22.960, dec: -29.62, mag:  1.16, constellation: 'Psa' },
  { name: 'Deneb',        ra: 20.690, dec:  45.28, mag:  1.25, constellation: 'Cyg' },
  { name: 'Mimosa',       ra: 12.795, dec: -59.69, mag:  1.25, constellation: 'Cru' },
  { name: 'Régulus',      ra: 10.139, dec:  11.97, mag:  1.40, constellation: 'Leo' },
  { name: 'Adhara',       ra: 6.977,  dec: -28.97, mag:  1.50, constellation: 'CMa' },
  { name: 'Castor',       ra: 7.577,  dec:  31.89, mag:  1.57, constellation: 'Gem' },
  { name: 'Gacrux',       ra: 12.519, dec: -57.11, mag:  1.63, constellation: 'Cru' },
  { name: 'Bellatrix',    ra: 5.418,  dec:   6.35, mag:  1.64, constellation: 'Ori' },
  { name: 'Elnath',       ra: 5.438,  dec:  28.61, mag:  1.66, constellation: 'Tau' },
  { name: 'Miaplacidus',  ra: 9.220,  dec: -69.72, mag:  1.67, constellation: 'Car' },
  { name: 'Alnilam',      ra: 5.604,  dec:  -1.20, mag:  1.69, constellation: 'Ori' },
  { name: 'Alnitak',      ra: 5.679,  dec:  -1.94, mag:  1.74, constellation: 'Ori' },
  { name: 'Dubhe',        ra: 11.062, dec:  61.75, mag:  1.79, constellation: 'UMa' },
  { name: 'Mirfak',       ra: 3.405,  dec:  49.86, mag:  1.79, constellation: 'Per' },
  { name: 'Polaris',      ra: 2.530,  dec:  89.26, mag:  1.97, constellation: 'UMi' },
  { name: 'Alkaid',       ra: 13.792, dec:  49.31, mag:  1.86, constellation: 'UMa' },
];
