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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2712755007538822"
          crossOrigin="anonymous"
        ></script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZDCNLMEHNR"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZDCNLMEHNR');
            `,
          }}
        />
      </Head>

      <div className="layoutContainer">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}