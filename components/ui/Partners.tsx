import { PartnerType, SponsorType } from '../../lib/graphql/types';
import Carousel from '@/components/ui/Carousel';
import { getTranslations } from 'next-intl/server';

const PARTNERS_QUERY = `
  query GetPartners {
    partners { id name image { url } link }
  }
`;

const SPONSORS_QUERY = `
  query GetSponsors {
    sponsors { id name image { url } link }
  }
`;

async function fetchCollection<T>(query: string, key: string): Promise<T[]> {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  if (!endpoint) return [];

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const json = await response.json();
    return (json?.data?.[key] as T[]) ?? [];
  } catch {
    return [];
  }
}

export default async function PartnersSponsorsPage() {
  const t = await getTranslations();

  const [partners, sponsors] = await Promise.all([
    fetchCollection<PartnerType>(PARTNERS_QUERY, 'partners'),
    fetchCollection<SponsorType>(SPONSORS_QUERY, 'sponsors'),
  ]);

  if (partners.length === 0 && sponsors.length === 0) return null;

  return (
    <div className="py-12">
      <div className="container mx-auto">
        {partners.length > 0 && (
          <Carousel items={partners} title={t('home.partners.title')} />
        )}

        {partners.length > 0 && sponsors.length > 0 && (
          <div className="my-12"></div>
        )}

        {sponsors.length > 0 && (
          <Carousel items={sponsors} title={t('home.sponsors.title')} />
        )}
      </div>
    </div>
  );
}
