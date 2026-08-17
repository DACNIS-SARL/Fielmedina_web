import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Match all pathnames except for
  // - … `/go`, the Meta ad attribution redirect (must not be locale-prefixed:
  //   the Universal Link declared in apple-app-site-association is `/go/*`)
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|go|trpc|_next|_vercel|.*\\..*).*)'
};