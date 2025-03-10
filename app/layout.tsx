import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "./MainLayout"; // Import MainLayout
import Script from "next/script";
import { translations } from "@/utils/translations"; // Import translations

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
  lang, // Accept lang as a prop
}: {
  children: React.ReactNode;
  lang: string; // Add lang to the props
}) {
  console.log("Current Language:", lang); // Debugging

  // Get the translation for the current language
  const translation = translations[lang] || translations.en;

  return (
    <html lang={translation.lang}> {/* Dynamically set the lang attribute */}
      <head>
        {/* Preload critical fonts for faster rendering */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Inline critical CSS to prevent render-blocking */}
        <style>
          {`
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              text-align: center;
              margin: 0;
              font-family: ${inter.className}, sans-serif;
            }
          `}
        </style>
      </head>

      <body>
        <MainLayout>{children}</MainLayout>

        {/* ✅ Defer non-critical scripts */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2712755007538822"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />

        <Script
          id="canonical-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              const canonicalUrlElement = document.getElementById('canonical-url');
              if (canonicalUrlElement) {
                const { canonicalUrl } = JSON.parse(canonicalUrlElement.textContent);
                const link = document.createElement('link');
                link.rel = 'canonical';
                link.href = canonicalUrl;
                document.head.appendChild(link);
              }
            `,
          }}
        />
      </body>
    </html>
  );
}