"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/Homepage.module.css";
import { translations } from "../utils/translations";
import Image from 'next/image';

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
  setGender,
  fetchRandomImage,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const content = translations[language] || translations.en;

  useEffect(() => {
    setIsClient(true);
    setImgSrc(imageUrl);
  }, [imageUrl]);

  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
    fetchRandomImage(selectedGender);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{content.heading}</h1>
      <p className={styles.paragraph}>{content.updatedOn}: January 16th, 2025</p>
      <p className={styles.paragraph}>{content.description}</p>

      {isClient && language === 'en' && (
        <div className={styles.borderBox}>
          Please join <a
            href="https://www.reddit.com/r/thispersondonotexist/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={styles.link}
          >
            r/thispersondoesnotexist
          </a>{" "}
          and if you found it useful, upvote us on this{" "}
          <a
            href="https://www.reddit.com/r/thispersondonotexist/comments/1j29klx/the_best_ai_face_generator/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={styles.link}
          >
            Reddit post.
          </a>{" "}
        </div>
      )}

      <div className={styles.buttons}>
        <button className={styles.btn} onClick={() => handleGenderChange("male")}>
          {content.male}
        </button>
        <button className={styles.btn} onClick={() => handleGenderChange("female")}>
          {content.female}
        </button>
      </div>

      <div className={styles.imageContainer}>
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt="This person does not exist"
            width={600}
            height={400}
            className={styles.image}
            priority
            onError={() => setImgSrc("https://via.placeholder.com/300?text=Image+Not+Found")}
          />
        ) : (
          <div className={styles.skeleton}></div>
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