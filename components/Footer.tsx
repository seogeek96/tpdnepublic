// components/Footer.tsx
import React from "react";
import Link from "next/link";
import styles from "@/styles/Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
      <Link href="/algorithm">Algorithm</Link> |{" "}
        <Link href="/contact">Contact Us</Link> |{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
      <p className={styles.copyright}>© 2025 This Person Does Not Exist. All rights reserved.</p>
    </footer>
  );
};

export default Footer;