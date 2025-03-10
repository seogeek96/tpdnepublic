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
  const pathname = usePathname();

  // Extract language segment from the URL
  const languageSegment = pathname.split("/")[1] || "";

  // Map legacy language codes to new ones
  const languageMap: { [key: string]: string } = {
    ae: "ar",
    br: "pt",
    cn: "zh",
    gr: "el",
    jp: "ja",
    kr: "ko",
    si: "sl",
    ua: "uk",
  };

  // Get the selected language
  const selectedLanguage = languageMap[languageSegment] || languageSegment || "en";

  // New canonical logic
  const canonicalUrl =
    selectedLanguage === "en"
      ? "https://thispersondoesnotexist.cc/"
      : `https://thispersondoesnotexist.cc/${selectedLanguage}`;

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
        {/* Pass selectedLanguage to the Header component */}
        <Header selectedLanguage={selectedLanguage} />
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