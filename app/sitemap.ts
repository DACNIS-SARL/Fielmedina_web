import { MetadataRoute } from 'next'
import { getPathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const BASE_URL = 'https://www.fielmedina.com'

const routes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/terms-conditions', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
] as const satisfies ReadonlyArray<{
  path: Parameters<typeof getPathname>[0]['href']
  priority: number
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
}>

function absoluteUrl(
  href: (typeof routes)[number]['path'],
  locale: (typeof routing.locales)[number]
): string {
  const pathname = getPathname({ href, locale })
  return pathname === '/' ? BASE_URL : `${BASE_URL}${pathname}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(route.path, locale),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, absoluteUrl(route.path, l)])
          ),
          'x-default': absoluteUrl(route.path, routing.defaultLocale),
        },
      },
    }))
  )
}
