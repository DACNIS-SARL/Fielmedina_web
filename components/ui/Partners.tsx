'use client';

import { useState, useEffect } from 'react';
import { PartnerType, SponsorType } from '../../lib/graphql/types';
import Carousel from '@/components/ui/Carousel';
import { useTranslations } from 'next-intl';

export default function PartnersSponsorsPage() {
  const t = useTranslations();
  const [partners, setPartners] = useState<PartnerType[]>([]);
  const [sponsors, setSponsors] = useState<SponsorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const partnersResponse = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
          body: JSON.stringify({
            query: `
              query GetPartners {
                partners {
                  id
                  name
                  image {
                    url
                  }
                  link
                }
              }
            `
          }),
        });
        const partnersData = await partnersResponse.json();

        const sponsorsResponse = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
          body: JSON.stringify({
            query: `
              query GetSponsors {
                sponsors {
                  id
                  name
                  image {
                    url
                  }
                  link
                }
              }
            `
          }),
        });
        const sponsorsData = await sponsorsResponse.json();

        setPartners(partnersData.data?.partners || []);
        setSponsors(sponsorsData.data?.sponsors || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load partners and sponsors');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto">
        {partners.length > 0 && (
          <Carousel items={partners} title="Our Partners" />
        )}

        {partners.length > 0 && sponsors.length > 0 && (
          <div className="my-12"></div>
        )}

        {sponsors.length > 0 && (
          <Carousel items={sponsors} title="Our Sponsors" />
        )}

        {partners.length === 0 && sponsors.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">{t('home.partners.empty')}</p>
          </div>
        )}
      </div>
    </div>
  );
}