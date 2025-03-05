import React from "react";
import Head from "next/head";
import styles from "../../styles/Algorithmpage.module.css";

const AlgorithmPage = () => {
  const metaDescription = "Explore NVIDIA's StyleGAN and StyleGAN2 algorithms powering our AI-generated human faces. Technical details on convolutional networks, noise injection, and public dataset availability. Updated January 2025.";
  const pageTitle = "AI Face Generation Algorithm | StyleGAN/StyleGAN2 Explained | This Person Does Not Exist";

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
        <h1 className={styles.heading}>Algorithm Used – This Person Does Not Exist</h1>
        <p className={styles.updatedOn}>Last Updated: December 20th, 2023</p>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.subheading}>Core Technology: StyleGAN Architecture</h2>
            <p>
              <strong>NVIDIA's StyleGAN</strong> (2019) and its successor <strong>StyleGAN2</strong> (2020) form the backbone of our face generation system. These generative adversarial networks (GANs) enable:
            </p>
            <ul className={styles.list}>
              <li>High-resolution (1024×1024) facial image synthesis</li>
              <li>Separate control of high-level attributes vs texture details</li>
              <li>Non-linear feature mixing through adaptive instance normalization</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subheading}>Key Technical Components</h2>
            <div className={styles.technicalDetails}>
              <div className={styles.detailItem}>
                <h3>Noise Injection</h3>
                <p>Uncorrelated Gaussian noise added at each convolution layer creates realistic stochastic variations in:</p>
                <ul>
                  <li>Hair texture</li>
                  <li>Skin pores</li>
                  <li>Facial hair patterns</li>
                </ul>
              </div>
              
              <div className={styles.detailItem}>
                <h3>Mapping Network</h3>
                <p>8-layer MLP transforms latent vectors to intermediate codes controlling:</p>
                <ul>
                  <li>Pose (yaw/pitch/roll)</li>
                  <li>Facial features spacing</li>
                  <li>Lighting conditions</li>
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subheading}>Dataset & Availability</h2>
            <p>
              Trained on FFHQ dataset containing 70,000 high-quality PNG images at 1024×1024 resolution. Public resources include:
            </p>
            <div className={styles.resources}>
                Official GitHub Repository
              
                StyleGAN Research Paper
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AlgorithmPage;