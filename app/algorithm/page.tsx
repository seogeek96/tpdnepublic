import React from "react";
import styles from "../../styles/Algorithmpage.module.css"; // Import the CSS Module

const AlgorithmPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Algorithm Used – This Person Does Not Exist</h1>
      <p className={styles.updatedOn}>Updated on December 20th, 2023</p>

      <div className={styles.content}>
        <p>
          <strong>StyleGAN</strong> is an algorithm developed by NVIDIA that allows for the generation of random people’s faces. The algorithm is based on a pre-trained model which is capable of finding hidden factors of variation such as position of a face, identity, and more than 100 parameters.
        </p>

        <p>
          It works by adjusting the image style and passing each convolutional layer one after the other. This allows for precise control of the image generation process. It also enables the algorithm to find all the hidden factors of variation and improve the level of control.
        </p>

        <p>
          The algorithm is also trained to produce images of high quality with a balance between quality and interpolation capabilities. The source code can be found on GitHub along with a new dataset available in the public domain since 2019. Furthermore, <strong>StyleGAN2</strong> was introduced in 2020.
        </p>
        <p>
          StyleGAN is an AI-generated algorithm that enables precise control over the generation of images. It begins by taking a constant input before adjusting the image style by passing each convolutional layer one after the other. This is used to control the features of the image at any scale.
        </p>

        <p>
          The algorithm also defines the high-level attributes of the image such as the position of the face, gender, hairstyle, and other details. Noise is added in the form of uncorrelated Gaussian noise, which is then adjusted based on the studied features.
        </p>

        <p>
          Currently, it is trained to generate images of high quality, and the source code is available to the public. Additionally, a new dataset was released in 2019, and <strong>StyleGAN2</strong> was released in 2020.
        </p>
      </div>
    </div>
  );
};

export default AlgorithmPage;