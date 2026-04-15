"use client"; // Mark as a Client Component
import React, { useState, useEffect, useCallback, useRef } from "react";
import HomePage from "@/components/Homepage";

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

export default function Home() {
  const [selectedLanguage] = useState("en");
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
