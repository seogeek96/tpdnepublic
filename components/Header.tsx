"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import "flag-icons/css/flag-icons.min.css";

interface HeaderProps {
  selectedLanguage: string;
}

const Header: React.FC<HeaderProps> = ({ selectedLanguage }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);

  const languages = [
    { code: "bg", name: "български", flag: "bg" },
    { code: "ar", name: "العربية", flag: "sa" },
    { code: "es", name: "Español", flag: "es" },
    { code: "fr", name: "Français", flag: "fr" },
    { code: "de", name: "Deutsch", flag: "de" },
    { code: "it", name: "Italiano", flag: "it" },
    { code: "ja", name: "日本語", flag: "jp" }, // Updated from jp to ja
    { code: "ko", name: "한국어", flag: "kr" }, // Updated from kr to ko
    { code: "zh", name: "中國", flag: "cn" }, // Updated from cn to zh
    { code: "ru", name: "Русский", flag: "ru" },
    { code: "pt", name: "Português", flag: "br" }, // Updated from br to pt
    { code: "ro", name: "Română", flag: "ro" },
    { code: "sv", name: "Svenska", flag: "se" },
    { code: "uk", name: "Українська", flag: "ua" }, // Updated from ua to uk
    { code: "el", name: "Ελληνικά", flag: "gr" }, // Updated from gr to el
    { code: "no", name: "Norsk", flag: "no" },
    { code: "id", name: "Indonesia", flag: "id" },
    { code: "tr", name: "Turkey", flag: "tr" },
    { code: "et", name: "Eesti keel", flag: "ee" },
    { code: "nl", name: "Nederlands", flag: "nl" },
    { code: "sl", name: "Slovenščina", flag: "si" }, // Updated from si to sl
    { code: "pl", name: "Polskie", flag: "pl" },
    { code: "fi", name: "Finnish", flag: "fi" },
    { code: "hi", name: "Hindi", flag: "in" },
    { code: "en", name: "English", flag: "gb" },
  ];



  // Updated to handle href generation
  const getLocalizedPath = (currentPath: string, newLang: string) => {
    const pathSegments = currentPath.split("/").filter(Boolean);
    if (languages.some((lang) => lang.code === pathSegments[0])) {
      pathSegments.shift();
    }
    return newLang === "en"
      ? `/${pathSegments.join("/")}`
      : `/${newLang}/${pathSegments.join("/")}`;
  };

  return (
    <div className={styles.header}>
      <Image
        src="/this person does not exist logo.png"
        alt="logo"
        width={500}
        height={300}
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
          <span
            className={`fi fi-${
              languages.find((l) => l.code === selectedLanguage)?.flag
            }`}
          />
          <span className={styles.languageName}>
            {languages.find((l) => l.code === selectedLanguage)?.name}
          </span>
        </button>

        {showDropdown && (
          <div className={styles.dropdownContent} role="menu">
            {languages.map((lang) => {
              const href = getLocalizedPath(pathname, lang.code);
              return (
                <a
                  key={lang.code}
                  href={href}
                  className={styles.languageItem}
                  role="menuitem"
                  onClick={() => setShowDropdown(false)}
                >
                  <span className={`fi fi-${lang.flag} ${styles.flag}`} />
                  <span className={styles.languageName}>{lang.name}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;