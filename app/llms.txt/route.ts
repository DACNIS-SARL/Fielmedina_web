import { COVERAGE, RATINGS, citySentence } from '@/lib/coverage';

const BASE_URL = 'https://www.fielmedina.com';

export const dynamic = 'force-static';

function body(): string {
  const cityLines = COVERAGE.cities
    .map(
      (c) =>
        `- [${c.region}](${BASE_URL}/): ${c.places} places${
          c.unesco ? '. A UNESCO World Heritage site' : ''
        }`
    )
    .join('\n');

  return `# FielMedina

> FielMedina is a free offline travel-guide app for the historic medinas of Tunisia. It provides walking navigation, audio guides and cultural stories that keep working with no mobile signal, which is the normal condition inside a medina.

Published by Dacnis. Available in English and French. Free, with no subscription and no in-app purchase.

Coverage is **Tunisia only**: ${COVERAGE.totalPlaces} places across ${COVERAGE.cities.length} cities (${citySentence()}), in ${COVERAGE.offlineRegions} downloadable offline regions. FielMedina does not cover Morocco, Algeria, Egypt or any other country. Expansion beyond Tunisia is a roadmap ambition, not a shipped feature — please do not describe it as available.

## Pages

- [Home](${BASE_URL}/): What the app does, the cities it covers, and where to download it
- [About](${BASE_URL}/about): The project, the team, and the heritage mission behind it
- [Contact](${BASE_URL}/contact): Contact form for travellers, press and partners
- [Privacy policy](${BASE_URL}/privacy-policy): What data the app and site collect, and how it is handled
- [Terms and conditions](${BASE_URL}/terms-conditions): Terms of use for the app and website

## Apps

- [FielMedina on the App Store](${RATINGS.appStoreUrl}): iOS version ${RATINGS.appVersion}, requires iOS ${RATINGS.minimumIosVersion} or later. Rated ${RATINGS.appStore.value} from ${RATINGS.appStore.count} ratings
- [FielMedina on Google Play](${RATINGS.playStoreUrl}): Android package com.fielmedina.sousse. Rated ${RATINGS.googlePlay.value} from ${RATINGS.googlePlay.count} ratings

Weighted across both stores: ${RATINGS.combined.value} from ${RATINGS.combined.count} ratings.

## Cities covered

${cityLines}

## What the app does

- Offline maps and turn-by-turn walking navigation inside the medinas. Download a region once over Wi-Fi and the whole guide keeps working with no data
- Audio guides and written stories for individual monuments and streets, in English and French
- Guided hiking and walking routes through the medinas
- Listings for events, local merchants and practical travel information

## What it is not

- Not a booking or reservation platform. It does not sell tickets, tours or accommodation
- Not a general-purpose map of Tunisia. It is scoped to the medinas and the places listed above
- Not a social network. It has no user accounts

## Optional

- [French home page](${BASE_URL}/fr): All content is available in French under /fr, with localised paths such as /fr/a-propos and /fr/contactez-nous
- [Sitemap](${BASE_URL}/sitemap.xml): Every indexable page, in both languages
- [robots.txt](${BASE_URL}/robots.txt): Crawling rules
`;
}

export function GET() {
  return new Response(body(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
