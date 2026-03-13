import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jain Online MBA - International Finance",
  description: "Online MBA in International Finance by Jain University, designed with Lakshya Commerce style.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-5XLDC59F" />
      <body className="antialiased font-sans">
        {/* Google Tag Manager (noscript) - fallback when JS is disabled */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5XLDC59F"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHE_SITE_KEY}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
