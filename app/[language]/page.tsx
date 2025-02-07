"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import HomePage from "@/components/Homepage";

export default function LanguagePage() {
  const { language } = useParams();
  const selectedLanguage = Array.isArray(language) ? language[0] : language || "en"; // Ensure it's a string

  const [imageUrl, setImageUrl] = useState("");
  const [gender, setGender] = useState("male");
  const [buttonText, setButtonText] = useState("Download Image");

  // ✅ Stable function with no unnecessary dependencies
  const fetchRandomImage = useCallback(async (selectedGender: string) => {
    try {
      const timestamp = Date.now();
      const apiUrl = `/api/image?gender=${selectedGender}&t=${timestamp}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const imageBlob = await response.blob();
      const newImageUrl = URL.createObjectURL(imageBlob);

      setImageUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl); // Clean previous image
        return newImageUrl;
      });
    } catch (error) {
      console.error("Error fetching image:", error);
      setImageUrl("https://via.placeholder.com/300?text=Image+Not+Found");
    }
  }, []); // ✅ Empty dependency array ensures function doesn't change

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender]); // ✅ Only runs when gender changes

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
        language={selectedLanguage} // Now guaranteed to be a string
        imageUrl={imageUrl}
        downloadImage={downloadImage}
        buttonText={buttonText}
        setGender={setGender}
        fetchRandomImage={fetchRandomImage}
      />
    </div>
  );
}
