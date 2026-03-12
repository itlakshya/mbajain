'use client';

import { sendGTMEvent as pushToDataLayer } from '@next/third-parties/google';

/**
 * GTM event names aligned with triggers in GTM (see gtmref.txt).
 * - form_submit: form submissions (lead modal step 1 & final submit)
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
