"use client"; // Mark as a Client Component
import React from "react";
import styles from "../styles/Homepage.module.css"; // Import the CSS Module
import { translations } from "../utils/translations"; // Correct import path

interface HomePageProps {
  language: string;
  imageUrl: string;
  downloadImage: () => void;
  buttonText: string;
  setGender: (gender: string) => void;
  fetchRandomImage: (gender: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  language,
  imageUrl,
  downloadImage,
  buttonText,
  setGender,
  fetchRandomImage,
}) => {
  const content = translations[language] || translations.en;

  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
    fetchRandomImage(selectedGender);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{content.heading}</h1>
      <p className={styles.paragraph}>{content.updatedOn}: January 16th, 2025</p>
      <p className={styles.paragraph}>{content.description}</p>

      <div className={styles.buttons}>
        <button className={styles.btn} onClick={() => handleGenderChange("male")}>
          {content.male}
        </button>
        <button className={styles.btn} onClick={() => handleGenderChange("female")}>
          {content.female}
        </button>
      </div>

      <div className={styles.imageContainer}>
  {imageUrl ? (
    <img
      src={imageUrl}
      alt="This person does not exist"
      title="This person does not exist"  
      className={styles.image}
      width={600}
      height={400}
      data-nimg="1"
      onError={(e) => {
        e.currentTarget.src = "https://via.placeholder.com/300?text=Image+Not+Found";
      }}
    />
  ) : (
    <div className={styles.skeleton}></div> // Skeleton loader
  )}
</div>

      <div className={styles.downloadButton}>
        <button className={styles.btn} onClick={downloadImage}>
          {content.downloadImage}
        </button>
      </div>

      <p className={styles.content}>{content.content}</p>
    </div>
  );
};

export default HomePage;