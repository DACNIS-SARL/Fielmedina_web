'use client';

import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '../../i18n/navigation';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const aria = useTranslations('common.ariaLabels');
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (newLocale: 'en' | 'fr') => {
    const searchParams = new URLSearchParams(window.location.search);

    const queryParams = Array.from(searchParams.entries()).reduce<Record<string, string | string[]>>(
      (acc, [key, value]) => {
        const existing = acc[key];
        if (existing === undefined) {
          acc[key] = value;
        } else if (Array.isArray(existing)) {
          existing.push(value);
        } else {
          acc[key] = [existing, value];
        }
        return acc;
      },
      {}
    );

    const href: Parameters<typeof router.replace>[0] =
      searchParams.size > 0 ? { pathname, query: queryParams } : pathname;

    router.replace(href, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-[#b65d37] transition-colors"
        aria-label={aria('switchLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="language-switcher"
      >
        <Globe className="size-5" />
        <span className="text-sm font-medium uppercase">
          {locale === 'en' ? 'EN' : 'FR'}
        </span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          <div
            className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-w-[120px]"
            id="language-switcher"
            role="listbox"
            aria-label={aria('switchLanguage')}
          >
            <button
              onClick={() => switchLocale('en')}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg ${
                locale === 'en' ? 'text-[#b65d37] font-semibold' : 'text-gray-700'
              }`}
              role="option"
              aria-selected={locale === 'en'}
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => switchLocale('fr')}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors last:rounded-b-lg ${
                locale === 'fr' ? 'text-[#b65d37] font-semibold' : 'text-gray-700'
              }`}
              role="option"
              aria-selected={locale === 'fr'}
            >
              🇫🇷 Français
            </button>
          </div>
        </>
      )}
    </div>
  );
} 
