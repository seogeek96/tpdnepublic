import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "./MainLayout";

const inter = Inter({ subsets: ["latin"] });

// ✅ Metadata definition
export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  other: {
    "google-site-verification": "noDxY7-Iw_ArIQTqmhnxSTTwPxM1R78uf9FxSnmJ_e0",
    "yandex-verification": "5424a42e25dece6b",
    "msvalidate.01": "394BAB3426D3AA6C5DF8FE0E8A95469B",
    "bing-site-verification": "YOUR_BING_VERIFICATION_CODE_HERE" // Add this line

  },
};

// ✅ Root Layout Component (No `params` Used)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"> {/* Default Language */}
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
