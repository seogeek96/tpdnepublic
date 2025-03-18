"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import HomePage from "@/components/Homepage";
import { notFound } from "next/navigation";

// Define valid languages (same as your layout metadata keys)
const VALID_LANGUAGES = new Set([
  "en", "es", "ar", "bg", "ru", "it", "fr", "tr", "ro", "zh",
  "sv", "uk", "el", "id", "no", "ja", "nl", "sl", "et", "pl",
  "ko", "de", "fi", "pt","hi"
]);

type LanguageMap = {
  [key: string]: string;
};

export default function LanguagePage() {
  const params = useParams();

  // Get mapped language
  const getMappedLanguage = useCallback((lang: string | string[] | undefined): string => {
    if (!lang) return "en";
    const rawLang = Array.isArray(lang) ? lang[0] : lang;
    
    const languageMap: LanguageMap = {
      ae: "ar", br: "pt", cn: "zh", gr: "el", 
      jp: "ja", kr: "ko", si: "sl", ua: "uk"
    };

    return languageMap[rawLang] || rawLang;
  }, []);

  const selectedLanguage = getMappedLanguage(params?.language);

  // Check if language is valid
  if (!VALID_LANGUAGES.has(selectedLanguage)) {
    notFound();
  }

  // Rest of your existing component logic
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