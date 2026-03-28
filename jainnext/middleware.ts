import { NextRequest, NextResponse } from 'next/server';

const TRACKING_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'gclid',
  'gbraid',
  'wbraid',
  'gad_source',
  'gad_campaignid',
  'campaignid',
  'utm_adgroup',
  'matchtype',
  'network',
  'utm_device',
  'utm_region',
  'placement',
];

const COOKIE_NAME = 'lsq_tp';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const params = new URLSearchParams();

  for (const key of TRACKING_KEYS) {
    const v = url.searchParams.get(key);
    if (v) params.set(key, v);
  }

  // Also harvest from Referer header if present (handles redirects stripping query).
  const referer = req.headers.get('referer');
  if (referer) {
    try {
      const refUrl = new URL(referer);
      for (const key of TRACKING_KEYS) {
        const v = refUrl.searchParams.get(key);
        if (v && !params.has(key)) params.set(key, v);
      }
    } catch {
      // ignore invalid referer
    }
  }

  const res = NextResponse.next();

  if (params.toString()) {
    res.cookies.set(COOKIE_NAME, params.toString(), {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
    });
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico)$).*)'],
};

