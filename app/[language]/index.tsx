import { useRouter } from "next/router";
import Head from "next/head";
import { translations } from "@/utils/translations"; // Import your translations
import HomePage from "@/components/Homepage";
import { applySiteDateYear } from "@/utils/site-date";

export default function LanguageIndexPage() {
  const router = useRouter();
  const { lang } = router.query; // Get the language from the URL

  // Fallback to English if the language is not found
  const metadata = translations[lang as string] || translations.en;
  const pageTitle = applySiteDateYear(metadata.title);

  return (
    <>
      {/* Set the HTML lang attribute and metadata dynamically */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://thispersondoesnotexist.cc/${lang}`} />
        <meta property="og:image" content="https://thispersondoesnotexist.cc/og-image.png" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://thispersondoesnotexist.cc/og-image.png" />
        <link rel="canonical" href={`https://thispersondoesnotexist.cc/${lang}`} />
      </Head>

      {/* Render the HomePage component with language-specific content */}
      <HomePage
        language={metadata.lang}
        images={[]} // Pass the images if needed
        downloadImage={() => {}} // Pass the download function if needed
        buttonText="Download Image" // Pass the button text if needed
        setGender={() => {}} // Pass the gender setter if needed
        fetchRandomImage={() => {}} // Pass the fetch function if needed
      />
    </>
  );
}
