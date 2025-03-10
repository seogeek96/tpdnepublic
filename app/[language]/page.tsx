"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import HomePage from "@/components/Homepage";

// Define the type for language mappings
type LanguageMap = {
  [key: string]: string;
};

export default function LanguagePage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // ✅ Type-safe language extraction
  const getMappedLanguage = useCallback((lang: string | string[] | undefined): string => {
    if (!lang) return "en"; // Default to English if undefined

    // Ensure lang is a string
    const rawLang = Array.isArray(lang) ? lang[0] : lang;

    // Define language mappings with explicit types
    const languageMap: LanguageMap = {
      ae: "ar",
      br: "pt",
      cn: "zh",
      gr: "el",
      jp: "ja",
      kr: "ko",
      si: "sl",
      ua: "uk",
    };

    // Use mapped value or fallback to rawLang
    return languageMap[rawLang] || rawLang;
  }, []);

  // ✅ Safe language extraction
  const selectedLanguage = getMappedLanguage(params?.language);

  // Redirect legacy URLs to their new versions
  useEffect(() => {
    if (!params?.language) return; // Skip if no language param

    // Ensure language is a string
    const rawLang = Array.isArray(params.language) ? params.language[0] : params.language;

    // Define redirect mappings
    const redirectMap: LanguageMap = {
      ae: "ar",
      br: "pt",
      cn: "zh",
      gr: "el",
      jp: "ja",
      kr: "ko",
      si: "sl",
      ua: "uk",
    };

    // Redirect if the language is in the redirect map
    if (redirectMap[rawLang]) {
      const newPath = pathname.replace(`/${rawLang}/`, `/${redirectMap[rawLang]}/`);
      router.replace(newPath);
    }
  }, [params, pathname, router]);

  // Rest of your existing logic...
  const [imageUrl, setImageUrl] = useState("");
  const [gender, setGender] = useState("male");
  const [buttonText, setButtonText] = useState("Download Image");

  const fetchRandomImage = useCallback(async (selectedGender: string) => {
    try {
      const timestamp = Date.now();
      const apiUrl = `/api/image?gender=${selectedGender}&t=${timestamp}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const imageBlob = await response.blob();
      const newImageUrl = URL.createObjectURL(imageBlob);

      setImageUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return newImageUrl;
      });
    } catch (error) {
      console.error("Error fetching image:", error);
      setImageUrl("https://via.placeholder.com/300?text=Image+Not+Found");
    }
  }, []);

  const downloadImage = () => {
    if (!imageUrl) {
      console.error("No image to download");
      return;
    }

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `image_${gender}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setButtonText("Download Complete");
    setTimeout(() => setButtonText("Download Image"), 3000);
  };

  useEffect(() => {
    fetchRandomImage(gender);
  }, [gender, fetchRandomImage]);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <div>
      {/* Remove the <Header /> component here */}
      <HomePage
        language={selectedLanguage}
        imageUrl={imageUrl}
        downloadImage={downloadImage}
        buttonText={buttonText}
        setGender={setGender}
        fetchRandomImage={fetchRandomImage}
      />
    </div>
  );
}