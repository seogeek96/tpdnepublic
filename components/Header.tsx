"use client"; // Mark as a Client Component
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../styles/Header.module.css";

const Header = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language is English
  const [showDropdown, setShowDropdown] = useState(false);

  const languages = [
    { code: "bg", name: "български" },
    { code: "ae", name: "العربية" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "jp", name: "日本語" },
    { code: "kr", name: "한국어" },
    { code: "cn", name: "中國" },
    { code: "ru", name: "Русский" },
    { code: "br", name: "Português" },
    { code: "ro", name: "Română" },
    { code: "sv", name: "Svenska" },
    { code: "ua", name: "Українська" },
    { code: "gr", name: "Ελληνικά" },
    { code: "no", name: "Norsk" },
    { code: "id", name: "Indonesia" },
    { code: "tr", name: "Turkey" },
    { code: "et", name: "Eesti keel" },
    { code: "nl", name: "Nederlands" },
    { code: "si", name: "Slovenščina" },
    { code: "pl", name: "Polskie" },
    { code: "fi", name: "Finnish" },
    { code: "en", name: "English" },
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
      <img
        src="/this person does not exist logo.png"
        alt="Logo"
        className={styles.logo}
        onClick={() => router.push("/")}
      />
      <div className={styles.languageDropdown}>
        <button
          className={styles.languageButton}
          onClick={() => setShowDropdown(!showDropdown)}
        >
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
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;