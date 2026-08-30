import { getTranslations } from 'next-intl/server';
import { COVERAGE, RATINGS } from '@/lib/coverage';

const BASE_URL = 'https://www.fielmedina.com';
const PUBLISHER = 'Dacnis';

type FaqItem = { question: string; answer: string };

export default async function StructuredData({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home.faq' });
  const meta = await getTranslations({ locale, namespace: 'metadata.home' });

  const faqItems = t.raw('items') as FaqItem[];

  const graph = [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}#organization`,
      name: 'FielMedina',
      legalName: PUBLISHER,
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
      foundingDate: '2024',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'TN',
        addressLocality: 'Sousse',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}#website`,
      url: BASE_URL,
      name: 'FielMedina',
      description: meta('description'),
      publisher: { '@id': `${BASE_URL}#organization` },
      inLanguage: ['en', 'fr'],
    },
    {
      '@type': 'MobileApplication',
      '@id': `${BASE_URL}#app`,
      name: 'FielMedina: Travel Guide',
      applicationCategory: 'TravelApplication',
      operatingSystem: 'iOS, Android',
      softwareVersion: RATINGS.appVersion,
      description: meta('description'),
      publisher: { '@id': `${BASE_URL}#organization` },
      inLanguage: ['en', 'fr'],
      installUrl: [RATINGS.appStoreUrl, RATINGS.playStoreUrl],
      downloadUrl: [RATINGS.appStoreUrl, RATINGS.playStoreUrl],
      featureList: [
        'Offline maps and walking navigation inside the medinas',
        'Audio guides and written stories for each point of interest',
        'Guided walking and hiking routes',
        'Events, local merchants and practical travel information',
        'English and French',
      ],
      offers: {
        '@type': 'Offer',
        price: 0,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: RATINGS.combined.value,
        ratingCount: RATINGS.combined.count,
        bestRating: 5,
        worstRating: 1,
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${BASE_URL}#cities`,
      name: 'Cities covered by FielMedina',
      numberOfItems: COVERAGE.cities.length,
      itemListElement: COVERAGE.cities.map((city, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'TouristDestination',
          name: city.name,
          description: `${city.region}. ${city.places} places in the FielMedina app.`,
          addressCountry: 'TN',
        },
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${BASE_URL}#faq`,
      isPartOf: { '@id': `${BASE_URL}#website` },
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  );
}
