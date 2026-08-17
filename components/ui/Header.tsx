'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { ComponentProps } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '../../i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('navigation');
  const aria = useTranslations('common.ariaLabels');
  const headerCopy = useTranslations('header');
  const router = useRouter();
  const pathname = usePathname();
  type LinkHref = ComponentProps<typeof Link>['href'];

  const anchorNavItems = [
    { name: t('home'), href: '/#home', key: 'home' },
    { name: t('cities'), href: '/#cities', key: 'cities' },
    { name: t('features'), href: '/#features', key: 'features' },
    { name: t('reviews'), href: '/#reviews', key: 'reviews' }
  ];

  const pageNavItems: Array<{ name: string; href: LinkHref; key: string }> = [
    { name: t('about'), href: '/about', key: 'about' },
    { name: t('contact'), href: '/contact', key: 'contact' }
  ];

  const handleNavClick = (href: string) => {
    // If it's a hash link (anchor), handle it specially
    if (href.startsWith('/#')) {
      const anchor = href.substring(2); // Remove '/#'

      // If we're not on the home page, navigate to home first then scroll
      if (pathname !== '/') {
        router.push(href as unknown as Parameters<typeof router.push>[0]);
      } else {
        // We're on home page, just scroll to the element
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    // For mobile menu, close it
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg z-50 border-b border-gray-200/50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center">
            <Link href="/" scroll={false}>
              <Image
                src="/logo.png"
                alt={headerCopy('logo')}
                width={180}
                height={40}
                className="w-[144px] h-[32px] lg:w-[180px] lg:h-[40px] object-contain"
                priority
                fetchPriority="high"
                loading="eager"
              />
            </Link>
          </div>
          <nav
            className="hidden lg:flex items-center space-x-8"
            aria-label={aria('mainNavigation')}
          >
            {anchorNavItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-700 hover:text-[#b65d37] font-medium transition-colors duration-300 cursor-pointer"
              >
                {item.name}
              </button>
            ))}
            {pageNavItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-[#b65d37] font-medium transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />

            {/* <motion.a
              href="https://play.google.com/store/apps/details?id=com.fielmedina.sousse"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-[#b65d37] text-white px-6 py-3 rounded-full 
                       hover:bg-[#a0542f] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Download className="size-4" />
              <span className="font-medium">{useTranslations('header')('download')}</span>
            </motion.a> */}
          </div>
          {/* Mobile controls - Language Switcher and Menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={aria('toggleNavigation')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-primary-navigation"
            >
              {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={isMenuOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
        id="mobile-primary-navigation"
        aria-label={aria('mainNavigation')}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {anchorNavItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.href)}
              className="block text-gray-700 hover:text-[#b65d37] font-medium py-2 transition-colors text-left w-full"
            >
              {item.name}
            </button>
          ))}
          {pageNavItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block text-gray-700 hover:text-[#b65d37] font-medium py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}


        </div>
      </motion.div>
    </motion.header>
  );
}
