import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.fielmedina.com';

const ANSWER_ENGINE_AGENTS = [
  'Google-Extended',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'meta-externalagent',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/server-status', '/go/'],
      },
      {
        userAgent: ANSWER_ENGINE_AGENTS,
        allow: '/',
        disallow: ['/api/', '/server-status', '/go/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL.replace('https://', ''),
  };
}
