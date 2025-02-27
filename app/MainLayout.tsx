"use client"; // ✅ Ensures this runs on client-side

import React from "react";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname(); // ✅ Get URL pathname
  const language = pathname.split("/")[1] || "en"; // ✅ Extract language or default to "en"
  const canonicalUrl = `https://thispersondoesnotexist.cc/${language}`;

  return (
    <>
      {/* Use next/script for Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-ZDCNLMEHNR"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZDCNLMEHNR');
          `,
        }}
      />

      <div className="layout-Container">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>

      {/* Pass canonicalUrl to RootLayout */}
      <script
        type="application/json"
        id="canonical-url"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ canonicalUrl }),
        }}
      />
    </>
  );
}