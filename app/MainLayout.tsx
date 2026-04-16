"use client"; // ✅ Ensures this runs on client-side

import React from "react";
import Script from "next/script";
import Head from "next/head"; // Import the Head component
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { applySiteDateYear } from "@/utils/site-date";

interface MainLayoutProps {
  children: React.ReactNode;
  lang: string; // Add lang prop
}

export default function MainLayout({ children, lang }: MainLayoutProps) {
  // Define metadata for each language
  const metadataByLang: {
    [key: string]: { title: string; keywords: string[] };
  } = {
    en: {
      title: "This Person Does Not Exist - AI-Generated Faces",
      keywords: ["AI-generated faces", "fake person", "AI images", "design tools"],
    },
    es: {
      title: "Esta Persona No Existe - Caras Generadas por IA",
      keywords: ["caras generadas por IA", "persona falsa", "imágenes de IA", "herramientas de diseño"],
    },
    fr: {
      title: "Cette Personne N'Existe Pas - Visages Générés par IA",
      keywords: ["visages générés par IA", "personne fictive", "images IA", "outils de design"],
    },
    hi:{
      
title: "यह आदमी मौजूद नहीं है - नकली चेहरा जनरेटर (2025)",
keywords:["यह आदमी मौजूद नहीं है - नकली चेहरा जनरेटर - नकली ऐ शकल - नकली शकल डाउनलोड - चेहरा की तस्वीर बनानी"],
    }
  };

  // Fallback to English if the language is not found
  const metadata = metadataByLang[lang] || metadataByLang.en;
  const pageTitle = applySiteDateYear(metadata.title);

  // New canonical logic
  const canonicalUrl =
    lang === "en"
      ? "https://thispersondoesnotexist.cc/"
      : `https://thispersondoesnotexist.cc/${lang}`;

  return (
    <>
      {/* Use next/head to manage the head section */}
      <Head>
        {/* Set the HTML lang attribute */}
        <html lang={lang} />
        {/* Set the document title */}
        <title>{pageTitle}</title>
        {/* Set the meta keywords */}
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        {/* Set the canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
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

      <div className="layout-Container">
        {/* Pass selectedLanguage to the Header component */}
        <Header selectedLanguage={lang} />
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
