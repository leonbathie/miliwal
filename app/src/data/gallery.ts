import type { IllustrationName } from '@/components/illustrations';

export interface GalleryItem {
  /** Optional photo URL (relative to /gallery/ or absolute). If the image fails
   *  to load the `illustration` SVG is shown instead. */
  photo?: string;
  /** SVG illustration used as fallback when no photo is available. */
  illustration: IllustrationName;
  titleFr: string;
  titleEn: string;
  titleFf: string;
  descFr: string;
  descEn: string;
  descFf: string;
}

/**
 * Curated cultural gallery — Fulani pastoral life and traditional artefacts.
 *
 * To use real photos: drop your JPEG/WebP files into `app/public/gallery/`
 * (e.g. `zebu.jpg`) and set `photo: '/gallery/zebu.jpg'` on the matching
 * entry. The build will copy them as-is and the rsync deploy will push them
 * to the VPS automatically.
 *
 * Public-domain photos can be sourced from Wikimedia Commons (search
 * "Fulani cattle", "Sahel zebu", "calabash", etc.) under CC0 / CC-BY-SA.
 */
export const GALLERY: GalleryItem[] = [
  {
    photo: '/gallery/zebu.webm',
    illustration: 'zebu',
    titleFr: 'Le zébu peul',
    titleEn: 'The Fulani zebu',
    titleFf: 'Nagge Fulɓe',
    descFr:
      'Bovin sahélien à longues cornes et bosse caractéristique. Le zébu est le cœur de l’économie pastorale peule depuis des millénaires.',
    descEn:
      'Sahelian cattle with long horns and a characteristic shoulder hump. The zebu has been the heart of Fulani pastoral life for millennia.',
    descFf:
      'Naagge ngootal e tafuru juutugol, hade duuɓi ujunere. Nagge ko ɓernde nguurndam Pulaagu.',
  },
  {
    photo: '/gallery/mouton.webm',
    illustration: 'sheep',
    titleFr: 'Le mouton balami',
    titleEn: 'The Balami sheep',
    titleFf: 'Mbaalu ndu',
    descFr:
      'Mouton ouest-africain à poils, élevé pour la laine, la viande et le lait. Sa rusticité s’adapte aux conditions arides du Sahel.',
    descEn:
      'West African hair sheep raised for wool, meat and milk. Its hardiness suits the arid Sahel conditions.',
    descFf:
      'Mbaalu jaltinaadi, ngu hokketeede laral, kosam e teeyngu. Maa rewa nokku peewɗo.',
  },
  {
    photo: '/gallery/acacia.webm',
    illustration: 'acacia',
    titleFr: 'L’acacia du Sahel',
    titleEn: 'The Sahel acacia',
    titleFf: 'Lekki ngarki',
    descFr:
      'Arbre emblématique de la savane sahélienne, à canopée en parasol. Son ombre est le refuge des troupeaux pendant la saison sèche chaude (Ceedu).',
    descEn:
      'Iconic savanna tree with umbrella-shaped canopy. Its shade shelters herds during Ceedu, the hot dry season.',
    descFf:
      'Lekki mawki e ladde Sahel, e tooke maggi maaƴe. Ɗum tonki nai nder Ceedu.',
  },
  {
    photo: '/gallery/calebasse.webm',
    illustration: 'calabash',
    titleFr: 'La calebasse (horde)',
    titleEn: 'The calabash gourd',
    titleFf: 'Horde',
    descFr:
      'Gourde évidée et séchée, utilisée pour conserver et servir le lait, le mil ou le bouilli. Souvent gravée de motifs géométriques.',
    descEn:
      'Hollowed-out and dried gourd used to store and serve milk, millet or porridge. Often engraved with geometric patterns.',
    descFf:
      'Horde ko duɗe duulnaande nde mooftata kosam, gawri walla ñebbe. Tuumi maayde e gite maagol.',
  },
  {
    photo: '/gallery/patre.webm',
    illustration: 'herder',
    titleFr: 'Le pâtre (gaynaako)',
    titleEn: 'The herder',
    titleFf: 'Gaynaako',
    descFr:
      'Berger peul avec son gandal (long bâton) et son boubou flottant. La transhumance saisonnière (jeyngol) façonne son année.',
    descEn:
      'Fulani herder with his long staff (gandal) and flowing boubou. Seasonal transhumance shapes his year.',
    descFf:
      'Gaynaako Pullo e gandal e boubou makko. Eggoo e nder hitaande ko nguurndam.',
  },
  {
    photo: '/gallery/mil.mp4',
    illustration: 'millet',
    titleFr: 'Le mil (gawri)',
    titleEn: 'Millet',
    titleFf: 'Gawri',
    descFr:
      'Céréale de base du Sahel, récoltée pendant Kawle. Le mil entre dans la préparation du couscous, de la bouillie et du tô.',
    descEn:
      'Sahelian staple crop, harvested during Kawle. Millet is used in couscous, porridge and tô.',
    descFf:
      'Gawri ko ñaameteeri Sahel, soñetee e Kawle. Gawri ngari e couscous, ñebbe e tô.',
  },
];
