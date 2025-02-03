import React from "react";
import Head from "next/head";
import Script from "next/script"; // Import the Script component
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  params?: {
    language?: string;
  };
}

// Metadata for Next.js 13+ (app directory)
export const metadata = {
  other: {
    'google-site-verification': 'noDxY7-Iw_ArIQTqmhnxSTTwPxM1R78uf9FxSnmJ_e0',
    'yandex-verification': '5424a42e25dece6b',
    'msvalidate.01': '394BAB3426D3AA6C5DF8FE0E8A95469B',
  },
};

export default function MainLayout({ children, params }: MainLayoutProps) {
  const language = params?.language || "en";
  const canonicalUrl = `https://yourwebsite.com/${language}`;

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/this person does not exist favicon.png" />

      </Head>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZDCNLMEHNR');
        `}
      </Script>
      <div className="layoutContainer">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}