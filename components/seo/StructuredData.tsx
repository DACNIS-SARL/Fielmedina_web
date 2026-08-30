import { getTranslations } from 'next-intl/server';

const BASE_URL = 'https://www.fielmedina.com';

const APP_FACTS = {
  version: '2.1.7',
  ratingValue: 4.7,
  ratingCount: 18,
  appStoreUrl: 'https://apps.apple.com/app/id6751167445',
  playStoreUrl:
    'https://play.google.com/store/apps/details?id=com.fielmedina.sousse',
  cities: [
    { name: 'Tunis', description: 'Medina of Tunis, a UNESCO World Heritage site' },
    { name: 'Sousse', description: 'Medina of Sousse, a UNESCO World Heritage site, and Hergla' },
    { name: 'Sidi Bou Said', description: 'The blue-and-white clifftop village north of Tunis' },
    { name: 'Monastir', description: 'Medina of Monastir and its ribat' },
    { name: 'Yasmine Hammamet', description: 'The Hammamet seafront medina district' },
  ],
} as const;

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
      softwareVersion: APP_FACTS.version,
      description: meta('description'),
      publisher: { '@id': `${BASE_URL}#organization` },
      inLanguage: ['en', 'fr'],
      installUrl: [APP_FACTS.appStoreUrl, APP_FACTS.playStoreUrl],
      downloadUrl: [APP_FACTS.appStoreUrl, APP_FACTS.playStoreUrl],
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
        ratingValue: APP_FACTS.ratingValue,
        ratingCount: APP_FACTS.ratingCount,
        bestRating: 5,
        worstRating: 1,
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${BASE_URL}#cities`,
      name: 'Cities covered by FielMedina',
      numberOfItems: APP_FACTS.cities.length,
      itemListElement: APP_FACTS.cities.map((city, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'TouristDestination',
          name: city.name,
          description: city.description,
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
