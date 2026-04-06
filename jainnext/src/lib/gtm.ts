'use client';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** Push to GTM dataLayer (direct push, same as GTM snippet). */
function pushToDataLayer(data: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(data);
}

/**
 * GTM event names aligned with triggers in GTM.
 * - form_submit: full lead form completion only (not step 1 — GTM tags often listen on this name)
 * - button_click: CTA / button clicks (e.g. Download Syllabus, Speak to Counselor)
 */

export function trackFormSubmit(payload: {
  form_name: string;
  form_step?: string;
  source?: string;
  [key: string]: unknown;
}) {
  pushToDataLayer({
    event: 'form_submit',
    ...payload,
  });
}

export function trackButtonClick(payload: {
  button_name: string;
  section?: string;
  cta_label?: string;
  [key: string]: unknown;
}) {
  pushToDataLayer({
    event: 'button_click',
    ...payload,
  });
}
