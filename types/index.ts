// types/index.ts
import React from "react";

export interface Translation {
  title: string;
  heading: string;
  updatedOn: string;
  downloadImage: string;
  male: string;
  female: string;
  description: string;
  content: React.ReactNode; // Use React.ReactNode instead of JSX.Element
}

export interface HomePageProps {
  language: string;
  imageUrl: string;
  downloadImage: () => void;
  buttonText: string;
  setGender: (gender: string) => void;
  fetchRandomImage: (gender: string) => void;
}