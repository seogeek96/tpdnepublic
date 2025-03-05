"use client";
import React, { useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import "flag-icons/css/flag-icons.min.css";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [showDropdown, setShowDropdown] = useState(false);

  // Corrected language configuration
  const languages = [
    { code: "bg", name: "български", flag: "bg" },
    { code: "ae", name: "العربية", flag: "sa" }, // Changed from ae to ar
    { code: "es", name: "Español", flag: "es" },
    { code: "fr", name: "Français", flag: "fr" },
    { code: "de", name: "Deutsch", flag: "de" },
    { code: "it", name: "Italiano", flag: "it" },
    { code: "ja", name: "日本語", flag: "jp" },
    { code: "ko", name: "한국어", flag: "kr" },
    { code: "zh", name: "中國", flag: "cn" },
    { code: "ru", name: "Русский", flag: "ru" },
    { code: "pt", name: "Português", flag: "pt" }, // Changed from br to pt
    { code: "ro", name: "Română", flag: "ro" },
    { code: "sv", name: "Svenska", flag: "se" },
    { code: "uk", name: "Українська", flag: "ua" },
    { code: "el", name: "Ελληνικά", flag: "gr" },
    { code: "no", name: "Norsk", flag: "no" },
    { code: "id", name: "Indonesia", flag: "id" },
    { code: "tr", name: "Türkçe", flag: "tr" },
    { code: "et", name: "Eesti keel", flag: "ee" },
    { code: "nl", name: "Nederlands", flag: "nl" },
    { code: "sl", name: "Slovenščina", flag: "si" },
    { code: "pl", name: "Polski", flag: "pl" }, // Corrected Polish name
    { code: "fi", name: "Suomi", flag: "fi" },
    { code: "en", name: "English", flag: "gb" },
  ];

  // Get current language from URL params
  const getCurrentLanguage = () => {
    return params.lang?.toString() || "en";
  };

  const [selectedLanguage, setSelectedLanguage] = useState(getCurrentLanguage());

  useEffect(() => {
    setSelectedLanguage(getCurrentLanguage());
  }, [pathname]);

  const handleLanguageChange = (languageCode: string) => {
    const newPath = `/${languageCode}${pathname.replace(/^\/[a-z]{2}\//, "/")}`;
    router.push(newPath);
    setShowDropdown(false);
  };

  return (
    <div className={styles.header}>
      <Image
        src="/this-person-does-not-exist-logo.png"
        alt="Website Logo"
        width={200}
        height={50}
        className={styles.logo}
        onClick={() => router.push("/")}
        priority
      />

      <div className={styles.languageDropdown}>
        <button
          className={styles.languageButton}
          onClick={() => setShowDropdown(!showDropdown)}
          aria-haspopup="true"
          aria-expanded={showDropdown}
        >
          <span className={`fi fi-${languages.find(l => l.code === selectedLanguage)?.flag} ${styles.flag}`} />
          <span className={styles.languageName}>
            {languages.find(l => l.code === selectedLanguage)?.name}
          </span>
        </button>

        {showDropdown && (
          <div className={styles.dropdownContent} role="menu">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={styles.languageItem}
                role="menuitem"
              >
                <span className={`fi fi-${lang.flag} ${styles.flag}`} />
                <span className={styles.languageName}>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;