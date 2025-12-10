import {type NextRequest, NextResponse} from 'next/server';
import {updateSession} from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  
  // if (pathname === "/") {
  //   return NextResponse.redirect(new URL("/me", request.url));
  // }
  return await updateSession(request);
}


export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|opengraph-image|twitter-image|icon|api/og|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
