"use client"; // Mark as a Client Component
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import "flag-icons/css/flag-icons.min.css"; // Import flag icons

const Header = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language is English
  const [showDropdown, setShowDropdown] = useState(false);

  const languages = [
    { code: "bg", name: "български", flag: "bg" }, // Bulgaria
    { code: "ae", name: "العربية", flag: "ae" }, // UAE (Arabic)
    { code: "es", name: "Español", flag: "es" }, // Spain
    { code: "fr", name: "Français", flag: "fr" }, // France
    { code: "de", name: "Deutsch", flag: "de" }, // Germany
    { code: "it", name: "Italiano", flag: "it" }, // Italy
    { code: "jp", name: "日本語", flag: "jp" }, // Japan
    { code: "kr", name: "한국어", flag: "kr" }, // South Korea
    { code: "cn", name: "中國", flag: "cn" }, // China
    { code: "ru", name: "Русский", flag: "ru" }, // Russia
    { code: "br", name: "Português", flag: "br" }, // Brazil
    { code: "ro", name: "Română", flag: "ro" }, // Romania
    { code: "sv", name: "Svenska", flag: "se" }, // Sweden
    { code: "ua", name: "Українська", flag: "ua" }, // Ukraine
    { code: "gr", name: "Ελληνικά", flag: "gr" }, // Greece
    { code: "no", name: "Norsk", flag: "no" }, // Norway
    { code: "id", name: "Indonesia", flag: "id" }, // Indonesia
    { code: "tr", name: "Turkey", flag: "tr" }, // Turkey
    { code: "et", name: "Eesti keel", flag: "ee" }, // Estonia
    { code: "nl", name: "Nederlands", flag: "nl" }, // Netherlands
    { code: "si", name: "Slovenščina", flag: "si" }, // Slovenia
    { code: "pl", name: "Polskie", flag: "pl" }, // Poland
    { code: "fi", name: "Finnish", flag: "fi" }, // Finland
    { code: "en", name: "English", flag: "gb" }, // United Kingdom
  ];

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setShowDropdown(false);

    // Navigate to the selected language page
    if (languageCode === "en") {
      router.push("/"); // Redirect to the home page for English
    } else {
      router.push(`/${languageCode}`); // Redirect to the language-specific page
    }
  };

  return (
    <div className={styles.header}>
      <Image
        src="/this person does not exist logo.png"
        alt="Logo"
        width={500}
        height={300}
        className={styles.logo}
        onClick={() => router.push("/")}
      />
      <div className={styles.languageDropdown}>
        <button
          className={styles.languageButton}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span
            className={`fi fi-${languages.find((lang) => lang.code === selectedLanguage)?.flag}`}
          ></span>{" "}
          {languages.find((lang) => lang.code === selectedLanguage)?.name || "English"}
        </button>
        {showDropdown && (
          <div className={styles.dropdownContent}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={styles.languageItem}
              >
                <span className={`fi fi-${lang.flag}`}></span> {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;