import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import PrefetchLinks from "@/components/PrefetchLinks";
import CookieConsent from "@/components/CookieConsent";
import { Toaster } from "sonner";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Find Generic Drug Alternatives`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Find Generic Drug Alternatives`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GSC_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GSC_VERIFICATION} />
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col antialiased">
        <SmoothScroll />
        <PrefetchLinks />
        <Header />

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <Footer />

        {/* Medical disclaimer banner */}
        <div className="bg-gray-100 border-t border-gray-200 py-2 text-center text-xs text-gray-500">
          GenericSwap provides FDA public data for informational purposes only. This is not medical
          advice.{" "}
          <a href="/disclaimer" className="underline hover:text-gray-700 transition-colors">
            Read our full disclaimer
          </a>
          .
        </div>

        {/* Cookie consent for GDPR / AdSense compliance */}
        <CookieConsent />

        {/* Toast notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              borderRadius: "12px",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
