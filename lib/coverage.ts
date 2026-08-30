export const COVERAGE = {
  totalPlaces: 88,
  offlineRegions: 6,
  languages: 2,
  cities: [
    { name: 'Tunis', places: 38, region: 'Medina of Tunis', unesco: true },
    { name: 'Sousse', places: 33, region: 'Medina of Sousse, Hergla', unesco: true },
    { name: 'Sidi Bou Said', places: 8, region: 'Sidi Bou Said', unesco: false },
    { name: 'Monastir', places: 6, region: 'Medina of Monastir', unesco: false },
    { name: 'Yasmine Hammamet', places: 3, region: 'Yasmine Hammamet', unesco: false },
  ],
} as const;

export const RATINGS = {
  appStore: { value: 4.75, count: 4 },
  googlePlay: { value: 4.7, count: 14 },
  combined: { value: 4.7, count: 18 },
  appVersion: '2.1.7',
  minimumIosVersion: '18.6',
  appStoreUrl: 'https://apps.apple.com/app/id6751167445',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.fielmedina.sousse',
} as const;

export const cityNames = COVERAGE.cities.map((c) => c.name);

export function citySentence(joiner = 'and'): string {
  const names = [...cityNames];
  const last = names.pop();
  return `${names.join(', ')} ${joiner} ${last}`;
}
