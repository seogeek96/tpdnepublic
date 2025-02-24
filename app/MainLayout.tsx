"use client"; // ✅ Ensures this runs on client-side

import React from "react";
import Head from "next/head";
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
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {/* Load AdSense script directly in the head */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2712755007538822"
          crossOrigin="anonymous"
        ></script>
      </Head>

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

      <div className="layoutContainer">
        <Header />
        <main>
          {/* Example Ad Unit */}
          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-2712755007538822"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (adsbygoogle = window.adsbygoogle || []).push({});
                `,
              }}
            />
          </div>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}