# Calendrier Fulfulde — Temps, Météo & Astres

Application web multilingue (FR / EN / FF) combinant un calendrier Fulfulde et un tableau de bord astronomique & météo, construite avec **Vite + TypeScript** (vanilla, sans framework UI).

## Stack

- **Vite** 5 — bundler & dev server
- **TypeScript** 5 — typage strict, paths alias `@/*`
- **SunCalc** 1.9 — calculs astronomiques (positions Soleil/Lune, crépuscules, phases)
- **Chart.js** 4 — graphique horaire 24h
- **Open-Meteo API** — données météo (sans clé API)

## Démarrage

```bash
npm install
npm run dev       # serveur de développement (http://localhost:5173)
npm run build     # production build dans dist/
npm run preview   # serve la build de production
npm run typecheck # vérification de types seule
```

## Arborescence

```
app/
├── index.html              Markup HTML (avec data-action et data-i18n)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.ts             Point d'entrée — bootstrap + délégation d'événements
    ├── styles/
    │   └── main.css        CSS global (palette, layout, print)
    ├── types/
    │   ├── i18n.ts         Translations, Lang, WeatherCode
    │   ├── weather.ts      OpenMeteoResponse, OpenMeteoCurrent/Hourly/Daily
    │   ├── astro.ts        SunPosition, MoonInfo, JulianDateInfo
    │   └── index.ts
    ├── i18n/
    │   ├── fr.ts, en.ts, ff.ts   Dictionnaires par langue
    │   └── index.ts        Loader + speechLangCode()
    ├── state/
    │   └── app-state.ts    État global (lang, year, lat/lon, cache météo)
    ├── services/
    │   ├── weather.ts      Appel Open-Meteo
    │   ├── astronomy.ts    SunCalc + JD/LST + zodiaque solaire
    │   ├── speech.ts       Web Speech API
    │   └── geolocation.ts  Géolocalisation promisifiée
    ├── utils/
    │   ├── dom.ts          setText / setHTML / setWidth / $
    │   ├── date.ts         pad, formatTimeOnly, mondayBasedIndex
    │   ├── format.ts       formatRA, formatDec
    │   ├── fulfulde.ts     nombreEnFulfulde, tempsEnFulfulde, temperatureEnFulfulde
    │   ├── season.ts       getSeason(month)
    │   ├── moon-phase.ts   classifyMoonPhase(phase)
    │   └── weather-icons.ts
    ├── components/
    │   ├── clock.ts            Horloge + JD/LST temps réel
    │   ├── ephemeris.ts        Bandeau saison / lune / soleil
    │   ├── month-card.ts       Génération 12 mois
    │   ├── lexicon.ts          Cartes de lexique multilingue
    │   ├── weather-card.ts     Carte météo + agrométéorologie
    │   ├── hourly-chart.ts     Graphique Chart.js 24h
    │   ├── daily-forecast.ts   Liste 7 jours
    │   ├── sun-arc.ts          Canvas — arc horizon
    │   ├── astro-panel.ts      Orchestrateur Soleil / Lune / boussole
    │   └── interpretation.ts   Texte interprétatif astronomique
    └── views/
        ├── calendar.ts     Render onglet Calendrier
        └── weather.ts      Render onglet Météo, géolocalisation, refresh
```

## Architecture

- **Pas de framework UI** : on manipule directement le DOM via des helpers typés (`utils/dom.ts`). Les composants exportent des fonctions pures `renderXxx(data)` qui écrivent dans des éléments par ID.
- **Délégation d'événements** : tous les `onclick` inline du HTML d'origine ont été remplacés par des attributs `data-action="…"`. Un seul listener global dans `main.ts` dispatche vers la bonne fonction. Plus testable, plus maintenable.
- **i18n par attribut** : chaque texte traduisible porte `data-i18n="clé"`. `updateStaticTexts()` parcourt le DOM et réécrit selon `state.lang`.
- **État global immuable par contrat** : `state` est exporté depuis `state/app-state.ts`. Les mutations sont localisées dans les vues (`calendar.ts`, `weather.ts`).
- **Path alias `@/`** : pour des imports stables (`@/utils/dom` au lieu de `../../utils/dom`).
- **Strict mode TypeScript** : `strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitOverride`, `noFallthroughCasesInSwitch`.

## API Open-Meteo

Endpoint sans authentification : `https://api.open-meteo.com/v1/forecast`. Paramètres demandés :

- `current` : `temperature_2m`, `apparent_temperature`, `relative_humidity_2m`, `precipitation`, `weather_code`, `cloud_cover`, `pressure_msl`, `wind_speed_10m`, `wind_gusts_10m`, `visibility`, `dew_point_2m`, `soil_temperature_0cm`, `soil_moisture_0_to_1cm`, `et0_fao_evapotranspiration`, `direct_radiation`
- `hourly` : `temperature_2m`, `precipitation_probability`, `weather_code`
- `daily` : `weather_code`, `temperature_2m_max`, `temperature_2m_min`, `sunrise`, `sunset`, `uv_index_max`

## Build de production

```bash
npm run build
```

Produit un dossier `dist/` autonome (HTML, JS minifié, CSS, sourcemaps), à servir derrière n'importe quel serveur statique.

## Notes Fulfulde

- Synthèse vocale : on tente `ff-Latn` ; en l'absence de voix Fulfulde dans le navigateur, le repli prend la voix par défaut (généralement FR ou EN). Aucune erreur, juste une prononciation approximative.
- Règle de lecture des heures : l'unité (`Yamnde`, `hojomaaji`, `leƳƳanɗe`) précède le nombre. Singulier/pluriel géré pour minutes (`hojom`/`hojomaaji`) et secondes (`leƳƳande`/`leƳƳanɗe`).
- Nombres 0-59 supportés. Composés via dizaine `+ e +` unité (ex. 32 → `capanɗe tati e ɗiɗi`).
