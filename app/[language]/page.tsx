"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import HomePage from "@/components/Homepage";
import { notFound } from "next/navigation";

const IMAGE_COUNT = 4;
const FALLBACK_IMAGE_URL = "";

type GeneratedImage = {
  id: string;
  gender: string;
  url: string;
  downloadUrl?: string;
};

const createPlaceholderImages = (selectedGender: string, prefix: string) => {
  return Array.from({ length: IMAGE_COUNT }, (_, index) => ({
    id: `${prefix}-${selectedGender}-${index + 1}`,
    gender: selectedGender,
    url: FALLBACK_IMAGE_URL,
  }));
};

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
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [gender, setGender] = useState("male");
  const [buttonText, setButtonText] = useState("Download Image");
  const requestIdRef = useRef(0);

  const fetchRandomImage = useCallback(async (selectedGender: string) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setImages(createPlaceholderImages(selectedGender, `loading-${requestId}`));

    try {
      const timestamp = Date.now();
      const apiUrl = `/api/image?gender=${selectedGender}&count=${IMAGE_COUNT}&t=${timestamp}`;
      const response = await fetch(apiUrl);

      if (requestId !== requestIdRef.current) return;

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Image API request failed:", {
          status: response.status,
          error: errorData?.error,
          details: errorData?.details,
        });
        setImages(createPlaceholderImages(selectedGender, "fallback"));
        return;
      }

      const data = await response.json();
      const signedImages = Array.isArray(data.images) ? data.images : [];

      if (requestId !== requestIdRef.current) return;

      setImages(signedImages);
    } catch (error) {
      if (requestId !== requestIdRef.current) return;

      console.error("Error fetching images:", error);
      setImages(createPlaceholderImages(selectedGender, "fallback"));
    }
  }, []);

  const downloadImage = (imageIndex = 0) => {
    const selectedImageUrl = images[imageIndex]?.downloadUrl || images[imageIndex]?.url;

    if (!selectedImageUrl) {
      console.error("No image to download");
      return;
    }

    const link = document.createElement("a");
    link.href = selectedImageUrl;
    link.download = `this-person-does-not-exist_${gender}_${images[imageIndex]?.id || imageIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setButtonText("Download Complete");
    setTimeout(() => setButtonText("Download Image"), 3000);
  };

  useEffect(() => {
    fetchRandomImage("male");
  }, [fetchRandomImage]);

  return (
    <div>
      <HomePage
        language={selectedLanguage}
        images={images}
        downloadImage={downloadImage}
        buttonText={buttonText}
        setGender={setGender}
        fetchRandomImage={fetchRandomImage}
      />
    </div>
  );
}
