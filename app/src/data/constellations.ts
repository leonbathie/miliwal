/**
 * Major constellations with approximate center coordinates.
 * RA in hours (0–24), Dec in degrees (-90..90).
 */
export interface ConstellationData {
  iau: string;        // IAU 3-letter abbreviation
  nameFr: string;
  nameEn: string;
  nameLatin: string;
  ra: number;
  dec: number;
}

/** 40 most recognizable constellations with approximate center coordinates. */
export const CONSTELLATIONS: ConstellationData[] = [
  // Zodiac
  { iau: 'Ari', nameFr: 'Bélier',     nameEn: 'Aries',       nameLatin: 'Aries',       ra: 2.5,  dec: 20 },
  { iau: 'Tau', nameFr: 'Taureau',    nameEn: 'Taurus',      nameLatin: 'Taurus',      ra: 4.5,  dec: 15 },
  { iau: 'Gem', nameFr: 'Gémeaux',    nameEn: 'Gemini',      nameLatin: 'Gemini',      ra: 7,    dec: 22 },
  { iau: 'Cnc', nameFr: 'Cancer',     nameEn: 'Cancer',      nameLatin: 'Cancer',      ra: 8.5,  dec: 20 },
  { iau: 'Leo', nameFr: 'Lion',       nameEn: 'Leo',         nameLatin: 'Leo',         ra: 10.5, dec: 15 },
  { iau: 'Vir', nameFr: 'Vierge',     nameEn: 'Virgo',       nameLatin: 'Virgo',       ra: 13,   dec: -2 },
  { iau: 'Lib', nameFr: 'Balance',    nameEn: 'Libra',       nameLatin: 'Libra',       ra: 15,   dec: -15 },
  { iau: 'Sco', nameFr: 'Scorpion',   nameEn: 'Scorpius',    nameLatin: 'Scorpius',    ra: 16.5, dec: -30 },
  { iau: 'Sgr', nameFr: 'Sagittaire', nameEn: 'Sagittarius', nameLatin: 'Sagittarius', ra: 19,   dec: -28 },
  { iau: 'Cap', nameFr: 'Capricorne', nameEn: 'Capricornus', nameLatin: 'Capricornus', ra: 21,   dec: -20 },
  { iau: 'Aqr', nameFr: 'Verseau',    nameEn: 'Aquarius',    nameLatin: 'Aquarius',    ra: 22.5, dec: -10 },
  { iau: 'Psc', nameFr: 'Poissons',   nameEn: 'Pisces',      nameLatin: 'Pisces',      ra: 1,    dec: 10 },

  // Northern famous
  { iau: 'UMa', nameFr: 'Grande Ourse', nameEn: 'Big Dipper / Ursa Major', nameLatin: 'Ursa Major', ra: 11,   dec: 55 },
  { iau: 'UMi', nameFr: 'Petite Ourse', nameEn: 'Little Bear',  nameLatin: 'Ursa Minor', ra: 15,  dec: 78 },
  { iau: 'Cas', nameFr: 'Cassiopée',    nameEn: 'Cassiopeia',   nameLatin: 'Cassiopeia', ra: 1,    dec: 60 },
  { iau: 'Cep', nameFr: 'Céphée',       nameEn: 'Cepheus',      nameLatin: 'Cepheus',    ra: 22,   dec: 70 },
  { iau: 'Dra', nameFr: 'Dragon',       nameEn: 'Draco',        nameLatin: 'Draco',      ra: 17,   dec: 65 },
  { iau: 'Cyg', nameFr: 'Cygne',        nameEn: 'Cygnus',       nameLatin: 'Cygnus',     ra: 20.5, dec: 42 },
  { iau: 'Lyr', nameFr: 'Lyre',         nameEn: 'Lyra',         nameLatin: 'Lyra',       ra: 18.8, dec: 38 },
  { iau: 'Aql', nameFr: 'Aigle',        nameEn: 'Aquila',       nameLatin: 'Aquila',     ra: 19.5, dec: 5 },
  { iau: 'Boo', nameFr: 'Bouvier',      nameEn: 'Boötes',       nameLatin: 'Boötes',     ra: 14.5, dec: 30 },
  { iau: 'And', nameFr: 'Andromède',    nameEn: 'Andromeda',    nameLatin: 'Andromeda',  ra: 0.7,  dec: 38 },
  { iau: 'Per', nameFr: 'Persée',       nameEn: 'Perseus',      nameLatin: 'Perseus',    ra: 3,    dec: 45 },
  { iau: 'CrB', nameFr: 'Couronne boréale', nameEn: 'Northern Crown', nameLatin: 'Corona Borealis', ra: 15.7, dec: 30 },
  { iau: 'Her', nameFr: 'Hercule',      nameEn: 'Hercules',     nameLatin: 'Hercules',   ra: 17.5, dec: 27 },
  { iau: 'Peg', nameFr: 'Pégase',       nameEn: 'Pegasus',      nameLatin: 'Pegasus',    ra: 22.5, dec: 20 },
  { iau: 'Aur', nameFr: 'Cocher',       nameEn: 'Auriga',       nameLatin: 'Auriga',     ra: 6,    dec: 42 },

  // Equatorial / Southern visible from West Africa
  { iau: 'Ori', nameFr: 'Orion',        nameEn: 'Orion',        nameLatin: 'Orion',      ra: 5.5,  dec: 0 },
  { iau: 'CMa', nameFr: 'Grand Chien',  nameEn: 'Canis Major',  nameLatin: 'Canis Major', ra: 6.8, dec: -22 },
  { iau: 'CMi', nameFr: 'Petit Chien',  nameEn: 'Canis Minor',  nameLatin: 'Canis Minor', ra: 7.7, dec: 5 },
  { iau: 'Lep', nameFr: 'Lièvre',       nameEn: 'Lepus',        nameLatin: 'Lepus',      ra: 5.5,  dec: -20 },
  { iau: 'Eri', nameFr: 'Éridan',       nameEn: 'Eridanus',     nameLatin: 'Eridanus',   ra: 3.5,  dec: -25 },
  { iau: 'Hya', nameFr: 'Hydre',        nameEn: 'Hydra',        nameLatin: 'Hydra',      ra: 11,   dec: -15 },
  { iau: 'Crv', nameFr: 'Corbeau',      nameEn: 'Corvus',       nameLatin: 'Corvus',     ra: 12.4, dec: -18 },
  { iau: 'Cen', nameFr: 'Centaure',     nameEn: 'Centaurus',    nameLatin: 'Centaurus',  ra: 13.5, dec: -47 },
  { iau: 'Cru', nameFr: 'Croix du Sud', nameEn: 'Southern Cross', nameLatin: 'Crux',     ra: 12.5, dec: -60 },
  { iau: 'Car', nameFr: 'Carène',       nameEn: 'Carina',       nameLatin: 'Carina',     ra: 8,    dec: -60 },
  { iau: 'Vel', nameFr: 'Voiles',       nameEn: 'Vela',         nameLatin: 'Vela',       ra: 9.5,  dec: -50 },
  { iau: 'Sgr', nameFr: 'Sagittaire',   nameEn: 'Sagittarius',  nameLatin: 'Sagittarius', ra: 19,  dec: -28 },
  { iau: 'Cet', nameFr: 'Baleine',      nameEn: 'Cetus',        nameLatin: 'Cetus',      ra: 2,    dec: -12 },
  { iau: 'Mon', nameFr: 'Licorne',      nameEn: 'Monoceros',    nameLatin: 'Monoceros',  ra: 7,    dec: -3 },
];
