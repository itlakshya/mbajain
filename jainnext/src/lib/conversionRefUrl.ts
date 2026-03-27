'use client';

const TRACKING_KEYS = [
  // Standard UTM
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  // Common ad click ids / campaign params
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

const LSQ_TRACKING_PARAMS_KEY = 'lsq_tracking_params';

const safeGetSessionStorage = () => {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

export function captureTrackingParamsFromCurrentUrl() {
  if (typeof window === 'undefined') return;
  const storage = safeGetSessionStorage();
  if (!storage) return;

  const params = new URLSearchParams(storage.getItem(LSQ_TRACKING_PARAMS_KEY) || '');

  const collectFromUrl = (raw: string) => {
    try {
      const u = new URL(raw, window.location.origin);
      for (const key of TRACKING_KEYS) {
        const value = u.searchParams.get(key);
        if (value) params.set(key, value);
      }
    } catch {
      // ignore malformed URLs
    }
  };

  // 1) Current URL (if UTMs exist here)
  collectFromUrl(window.location.href);

  // 2) Referrer URL (useful when a redirect stripped query params)
  if (document.referrer) {
    collectFromUrl(document.referrer);
  }

  const asString = params.toString();
  if (asString) storage.setItem(LSQ_TRACKING_PARAMS_KEY, asString);
}

export function buildConversionRefUrl(): string {
  if (typeof window === 'undefined') return '';
  const storage = safeGetSessionStorage();

  const url = new URL(window.location.href);
  const storedParams = storage ? storage.getItem(LSQ_TRACKING_PARAMS_KEY) : null;
  const merged = new URLSearchParams(url.search);

  if (storedParams) {
    const stored = new URLSearchParams(storedParams);
    for (const [k, v] of stored.entries()) {
      if (!merged.has(k) && v) merged.set(k, v);
    }
  }

  // Force the URL to include tracking params if we have them,
  // even when user is on a clean internal route.
  url.search = merged.toString();
  return url.toString();
}

export function debugTrackingSnapshot() {
  if (typeof window === 'undefined') return;
  const storage = safeGetSessionStorage();
  const storedParams = storage ? storage.getItem(LSQ_TRACKING_PARAMS_KEY) : null;
  console.log('[tracking] snapshot', {
    href: window.location.href,
    referrer: document.referrer || null,
    storedParams,
    hrefHasUtm: /[?&]utm_/i.test(window.location.href),
    storedHasUtm: storedParams ? /(^|&)utm_/i.test(storedParams) : false,
  });
}

