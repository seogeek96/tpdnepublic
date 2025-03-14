import React from "react";
import Head from "next/head";
import styles from "../../styles/ContactUs.module.css";

const ContactUs = () => {
  const metaDescription = "Contact this person does not exist. Contact us using the form below or via email on this page given below.";
  const pageTitle = "Contact Us - This Person Does Not Exist";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
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