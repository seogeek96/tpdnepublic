"use client"; // Mark as a Client Component
import React, { useState, useEffect } from "react";
import HomePage from "@/components/Homepage";

export default function Home() {
  const [selectedLanguage] = useState("en");
  const [imageUrl, setImageUrl] = useState("");
  const [gender, setGender] = useState("male");
  const [buttonText, setButtonText] = useState("Download Image");
  const fetchRandomImage = async (selectedGender: string) => {
    try {
      // Add a cache-busting query parameter (timestamp)
      const timestamp = Date.now();
      const apiUrl = `/api/image?gender=${selectedGender}&t=${timestamp}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      // Create a blob URL for the image
      const imageBlob = await response.blob();
      const newImageUrl = URL.createObjectURL(imageBlob);

      // Revoke the previous blob URL to free up memory
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }

      setImageUrl(newImageUrl); // Set the new blob URL
    } catch (error) {
      console.error("Error fetching image:", error);
      setImageUrl("https://via.placeholder.com/300?text=Image+Not+Found");
    }
  };

  const downloadImage = () => {
    if (!imageUrl) {
      console.error("No image to download");
      return;
    }
  
    const link = document.createElement("a");
    link.href = imageUrl; // Use the existing blob URL
    link.download = `image_${gender}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    setButtonText("Download Complete");
    setTimeout(() => setButtonText("Download Image"), 3000);
  };
  
  // Fetch a new image whenever the language or gender changes
  useEffect(() => {
    fetchRandomImage(gender);
  }, [gender]);

  // Clean up the blob URL when the component unmounts
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