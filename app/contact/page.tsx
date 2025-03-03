import React from "react";
import Head from "next/head"; // Import Head component
import styles from "../../styles/ContactUs.module.css";

const ContactUs = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className={styles.container}>
        <h1>Talk to Us</h1>
        <form className={styles.form}>
          <label className={styles.label}>Name</label>
          <input type="text" className={styles.input} placeholder="Your Name" />

          <label className={styles.label}>E-mail</label>
          <input type="email" className={styles.input} placeholder="Your Email" />

          <label className={styles.label}>Message</label>
          <textarea className={styles.textarea} placeholder="Your Message"></textarea>

          <button type="submit" className={styles.button}>Send Message</button>
        </form>
      </div>
    </>
  );
};

export default ContactUs;