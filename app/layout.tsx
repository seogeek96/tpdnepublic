import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "./MainLayout";

const inter = Inter({ subsets: ["latin"] });

// ✅ Viewport definition
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

// ✅ Metadata definition
export const metadata: Metadata = {
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
    images: ["https://thispersondoesnotexist.cc/og-image.png"],
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
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}