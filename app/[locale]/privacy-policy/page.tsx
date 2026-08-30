import PrivacyPolicy from '@/components/ui/PrivacyPolicy';
import { ApolloProvider } from '@/components/providers/ApolloProvider';
import Header from '@/components/ui/Header';
import {getTranslations} from 'next-intl/server';
import {Metadata} from 'next';
import { getPathname } from '../../../i18n/navigation';
import { routing } from '../../../i18n/routing';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata.privacyPolicy'});
  const canonicalPath = getPathname({ locale, href: '/privacy-policy' });
  const alternateLanguagesEntries = routing.locales.map((alternateLocale) => [
    alternateLocale,
    getPathname({ locale: alternateLocale, href: '/privacy-policy' })
  ]) as Array<[string, string]>;
  const alternateLanguages = Object.fromEntries(alternateLanguagesEntries);
  const xDefaultHref =
    alternateLanguages[routing.defaultLocale] ??
    getPathname({ locale: routing.defaultLocale, href: '/privacy-policy' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL('https://www.fielmedina.com'),
    alternates: {
      canonical: canonicalPath,
      languages: {
        ...alternateLanguages,
        'x-default': xDefaultHref
      },
    },
  };
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <ApolloProvider>
        <PrivacyPolicy />
      </ApolloProvider>
    </>
  );
} 
