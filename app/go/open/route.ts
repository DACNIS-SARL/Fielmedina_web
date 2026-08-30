import { NextRequest, NextResponse } from 'next/server';

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
    const params = request.nextUrl.searchParams.toString();
    const destination = params
      ? `${PLAY_STORE_URL}&referrer=${encodeURIComponent(params)}`
      : PLAY_STORE_URL;
    return NextResponse.redirect(destination, 302);
  }

  return NextResponse.redirect(WEB_FALLBACK_URL, 302);
}
