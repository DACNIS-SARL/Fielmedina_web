export const config = {
  graphqlUrl: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/graphql',
  
  defaultLanguage: 'en',
  
  supportedLanguages: ['en', 'fr'],
} as const;
