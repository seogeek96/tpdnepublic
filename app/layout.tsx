import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "./MainLayout";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// ✅ Viewport definition
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

// ✅ Metadata definition
export const metadata: Metadata = {
  title: "This Person Does Not Exist - AI-Generated Faces",
  description: "Explore AI-generated faces and fake person images. Perfect for design tools and creative projects.",
  keywords: ["AI-generated faces", "fake person", "AI images", "design tools"],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://thispersondoesnotexist.cc",
    title: "This Person Does Not Exist - AI-Generated Faces",
    description: "Explore AI-generated faces and fake person images. Perfect for design tools and creative projects.",
    images: [
      {
        url: "https://thispersondoesnotexist.cc/og-image.png",
        width: 1200,
        height: 630,
        alt: "This Person Does Not Exist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "This Person Does Not Exist - AI-Generated Faces",
    description: "Explore AI-generated faces and fake person images. Perfect for design tools and creative projects.",
    images: ["https://thispersondoesnotexist.com/og-image.png"],
  },
  other: {
    "google-site-verification": "noDxY7-Iw_ArIQTqmhnxSTTwPxM1R78uf9FxSnmJ_e0",
    "yandex-verification": "5424a42e25dece6b",
    "msvalidate.01": "394BAB3426D3AA6C5DF8FE0E8A95469B",
  },
};

// ✅ Root Layout Component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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