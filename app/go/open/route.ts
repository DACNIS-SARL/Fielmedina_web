import { NextRequest, NextResponse } from 'next/server';

/**
 * Attribution entry point for Meta app-install ads.
 *
 * Every Meta ad must point here rather than straight at a store listing. On iOS
 * 14.5+ only a small minority of users grant ATT — 7% for this app — so Meta
 * cannot use the IDFA and attributes through Aggregated Event Measurement
 * instead: the ad click opens this URL as a Universal Link, iOS hands it to the
 * app, and the Meta SDK reads the campaign ID out of it. Point an ad straight at
 * the App Store and the campaign ID never reaches the device, which is exactly
 * the state the ad account was in before August 2026.
 *
 * When the app is not installed, iOS falls back to loading this URL in Safari, so
 * it has to work as an ordinary web redirect too. That is the rest of this file.
 *
 * The path is `/go/*` rather than `/app/*` because `app/[locale]` would read the
 * first segment as a locale. `go` is excluded from the next-intl matcher in
 * `proxy.ts` for the same reason, and is declared in
 * `public/.well-known/apple-app-site-association`.
 */

const APP_STORE_URL = 'https://apps.apple.com/us/app/fielmedina/id6751167445';
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.fielmedina.sousse';
const WEB_FALLBACK_URL = 'https://www.fielmedina.com/';

export const dynamic = 'force-dynamic';

export function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') ?? '';

  const isIOS = /iPad|iPhone|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);

  if (isIOS) {
    return NextResponse.redirect(APP_STORE_URL, 302);
  }

  if (isAndroid) {
    // Play Store reads `referrer` for install attribution, so forward whatever
    // Meta appended to the click. The App Store has no equivalent — it ignores
    // unknown parameters — which is why this only runs on Android.
    const params = request.nextUrl.searchParams.toString();
    const destination = params
      ? `${PLAY_STORE_URL}&referrer=${encodeURIComponent(params)}`
      : PLAY_STORE_URL;
    return NextResponse.redirect(destination, 302);
  }

  return NextResponse.redirect(WEB_FALLBACK_URL, 302);
}
