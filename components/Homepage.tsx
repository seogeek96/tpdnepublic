"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/Homepage.module.css";
import { translations } from "../utils/translations";
import Image from "next/image";

type GeneratedImage = {
  id: string;
  gender: string;
  url: string;
  downloadUrl?: string;
};

const reloadImageLabels: Record<string, string> = {
  en: "Reload Images",
  ar: "إعادة تحميل الصور",
  bg: "Зареди нови изображения",
  de: "Neue Bilder laden",
  el: "Επαναφόρτωση εικόνων",
  es: "Recargar imágenes",
  et: "Laadi pildid uuesti",
  fi: "Lataa kuvat uudelleen",
  fr: "Recharger les images",
  hi: "नई तस्वीरें लोड करें",
  id: "Muat ulang gambar",
  it: "Ricarica immagini",
  ja: "画像を再読み込み",
  ko: "이미지 다시 불러오기",
  nl: "Afbeeldingen opnieuw laden",
  no: "Last inn bilder på nytt",
  pl: "Załaduj obrazy ponownie",
  pt: "Recarregar imagens",
  ro: "Reîncarcă imaginile",
  ru: "Загрузить новые изображения",
  sl: "Znova naloži slike",
  sv: "Ladda om bilder",
  tr: "Görselleri yeniden yükle",
  uk: "Завантажити нові зображення",
  zh: "重新加载图片",
};

interface HomePageProps {
  language: string;
  images: GeneratedImage[];
  downloadImage: (imageIndex?: number) => void;
  buttonText: string;
  setGender: (gender: string) => void;
  fetchRandomImage: (gender: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  language,
  images,
  downloadImage,
  setGender,
  fetchRandomImage,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [selectedGender, setSelectedGender] = useState("male");
  const [failedImageKeys, setFailedImageKeys] = useState<Record<string, true>>({});
  const content = translations[language] || translations.en;
  const reloadImagesText = reloadImageLabels[language] || reloadImageLabels.en;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setFailedImageKeys({});
  }, [images]);

  const handleGenderChange = (selectedGender: string) => {
    setSelectedGender(selectedGender);
    setGender(selectedGender);
    fetchRandomImage(selectedGender);
  };

  const handleReload = () => {
    fetchRandomImage(selectedGender);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{content.heading}</h1>
      <p className={styles.paragraph}>{content.updatedOn}: March 1st, 2025</p>
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
        <button className={styles.btn} onClick={handleReload}>
          {reloadImagesText}
        </button>
      </div>

      <div className={styles.imageGrid}>
        {images.length > 0 ? (
          images.map((image, index) => {
            const imageKey = `${image.id}-${index}`;
            const isImageAvailable = Boolean(image.url && !failedImageKeys[imageKey]);

            return (
              <div className={styles.imageItem} key={imageKey}>
                <div className={styles.imageFrame}>
                  {isImageAvailable ? (
                    <Image
                      src={image.url}
                      alt={`This person does not exist ${index + 1}`}
                      width={400}
                      height={400}
                      className={styles.image}
                      unoptimized
                      onError={() =>
                        setFailedImageKeys((currentKeys) => ({
                          ...currentKeys,
                          [imageKey]: true,
                        }))
                      }
                    />
                  ) : (
                    <div className={styles.skeleton}></div>
                  )}
                </div>
                <button
                  className={styles.btn}
                  onClick={() => downloadImage(index)}
                  disabled={!isImageAvailable}
                >
                  {content.downloadImage}
                </button>
              </div>
            );
          })
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <div className={styles.imageItem} key={`initial-loader-${index}`}>
              <div className={styles.imageFrame}>
                <div className={styles.skeleton}></div>
              </div>
              <button className={styles.btn} disabled>
                {content.downloadImage}
              </button>
            </div>
          ))
        )}
      </div>

      <div className={styles.content}>{content.content}</div>
    </div>
  );
};

export default HomePage;
