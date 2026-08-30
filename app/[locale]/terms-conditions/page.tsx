import TermsConditions from '@/components/ui/TermsConditions';
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
  const t = await getTranslations({locale, namespace: 'metadata.termsConditions'});
  const canonicalPath = getPathname({ locale, href: '/terms-conditions' });
  const alternateLanguagesEntries = routing.locales.map((alternateLocale) => [
    alternateLocale,
    getPathname({ locale: alternateLocale, href: '/terms-conditions' })
  ]) as Array<[string, string]>;
  const alternateLanguages = Object.fromEntries(alternateLanguagesEntries);
  const xDefaultHref =
    alternateLanguages[routing.defaultLocale] ??
    getPathname({ locale: routing.defaultLocale, href: '/terms-conditions' });

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

export default function TermsConditionsPage() {
  return (
    <>
      <Header />
      <ApolloProvider>
        <TermsConditions />
      </ApolloProvider>
    </>
  );
} 
