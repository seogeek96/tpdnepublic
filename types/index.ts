// types/index.ts
import React from "react";

export interface Translation {
  lang: string; // Add this property for the language code
  title: string;
  heading: string;
  updatedOn: string;
  downloadImage: string;
  keywords:string;
  male: string;
  female: string;
  description: string;
  content: React.ReactNode; // Use React.ReactNode instead of JSX.Element
}

export interface HomePageProps {
  language: string;
  images: Array<{
    id: string;
    gender: string;
    url: string;
    downloadUrl?: string;
  }>;
  downloadImage: (imageIndex?: number) => void;
  buttonText: string;
  setGender: (gender: string) => void;
  fetchRandomImage: (gender: string) => void;
}
