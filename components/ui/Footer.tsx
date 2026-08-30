import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import InstagramIcon from '../icons/InstagramIcon';
import FacebookIcon from '../icons/FacebookIcon';
import TiktokIcon from '../icons/TiktokIcon';
import YoutubeIcon from '../icons/YoutubeIcon';

export default function Footer() {
  const t = useTranslations('footer');
  const aria = useTranslations('common.ariaLabels');

  const socialLinks = [
    {
      icon: InstagramIcon,
      href: 'http://instagram.com/fielmedina.officiel',
      label: t('socialMedia.instagram')
    },
    {
      icon: FacebookIcon,
      href: 'https://www.facebook.com/fielmedina.officiel/',
      label: t('socialMedia.facebook')
    },
    {
      icon: TiktokIcon,
      href: 'https://www.tiktok.com/@fielmedina_officiel',
      label: t('socialMedia.tiktok')
    },
    {
      icon: YoutubeIcon,
      href: 'https://www.youtube.com/@fielmedina.officiel',
      label: t('socialMedia.youtube')
    }
  ];

  const supporters = [
    {
      name: 'Office National du Tourisme Tunisien (ONTT)',
      shortName: 'ONTT',
      logo: '/partners/ontt.png',
      width: 180,
      height: 74,
      href: 'https://www.discovertunisia.com/'
    }
  ];

  return (
    <footer className="footer-wrapper bg-linear-to-br from-[#FDF7EC] to-orange-50">
      <div className="footer-decoration" />

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16 lg:py-20 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-12">
            <div className="space-y-10 text-center lg:text-left">

              <div className="flex justify-center lg:justify-start gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group size-12 rounded-full border-2 border-gray-600 flex items-center justify-center text-[#b65d37] hover:border-white hover:bg-[#b65d37] hover:text-white focus-ring transition-all duration-300"
                  >
                    <Icon width="20" height="20" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-black/70 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-gray-200 text-center lg:text-left">
                {t('copyright')}
              </div>

              <nav
                className="flex flex-wrap justify-center gap-6 lg:gap-8"
                aria-label={aria('footerNavigation')}
              >
                <Link
                  href="/terms-conditions"
                  className="text-gray-200 hover:text-[#b65d37] hover:underline focus-ring transition-colors duration-300"
                >
                  {t('links.terms')}
                </Link>
                <Link
                  href="/privacy-policy"
                  className="text-gray-200 hover:text-[#b65d37] hover:underline focus-ring transition-colors duration-300"
                >
                  {t('links.privacy')}
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
