"use client"; // Mark as a Client Component
import React, { useState, useEffect, useCallback } from "react";
import HomePage from "@/components/Homepage";

// Define the type for the component's props
interface LanguagePageProps {
  params: { language: string };
}

export default function LanguagePage({ params }: LanguagePageProps) {
  const language = params.language || "en";
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

      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }

      setImageUrl(newImageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
      setImageUrl("https://via.placeholder.com/300?text=Image+Not+Found");
    }
  }, [imageUrl]);

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
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div>
      <HomePage
        language={language}
        imageUrl={imageUrl}
        downloadImage={downloadImage}
        buttonText={buttonText}
        setGender={setGender}
        fetchRandomImage={fetchRandomImage}
      />
    </div>
  );
}