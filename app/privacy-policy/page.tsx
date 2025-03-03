import React from 'react';
import Head from 'next/head'; // Import the Head component
import styles from "../../styles/PrivacyPolicy.module.css"; // Import the CSS Module
import "../../styles/globals.css";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" /> {/* Add noindex, nofollow meta tag */}
      </Head>

      <div className={styles.container}>
        <h1>Privacy Policy – This Person Does Not Exist</h1>
        <p>Updated on December 20th, 2023</p>

        <p>
          At This Person Does Not Exist, accessible from{' '}
          <a href="https://this person does not exist.cc/" className={styles.link}>
            https://this person does not exist.cc/
          </a>
          , one of our top priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by This Person Does Not Exist and how we use it.
        </p>

        <p>
          If you have additional questions or need additional information about our privacy policy, you can contact us.
        </p>

        <p>
          This Privacy Policy applies only to our online activities and is valid for guests to our website with regards to the information that they shared and/or collected in This Person Does Not Exist. This policy is not applicable to any information collected offline or via channels other than this website.
        </p>

        <h2>Consent</h2>
        <p>If you use our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

        <h2>Information we collect</h2>
        <p>
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to ensure your personal information.
        </p>

        <p>
          If you contact us directly, we may receive additional information about you, for example, your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
        </p>

        <h2>How we use your information</h2>
        <p>We use the information we collect in various ways, including for:</p>
        <ul>
          <li>Support and management of our website.</li>
          <li>Understanding and analyzing how you use our website.</li>
          <li>Development of new products, services, functions and functionality.</li>
          <li>Fraud detection and prevention.</li>
        </ul>

        <h2>Log Files</h2>
        <p>
          This Person Does Not Exist follows an ordinary procedure of using log files. These files log visitors when they visit websites. All hosting companies and part of hosting services’ analytics do this. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The only target of the information is for analyzing trends, administering the site, tracking users’ movement on the website, and gathering demographic information. We do not use this information for our personal purposes.
        </p>

        <h2>Cookies and Web Beacons</h2>
        <p>
          This Person Does Not Exist uses ‘cookies’ just like other sites. These cookies are used to store information based on visitors’ preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users’ experience by customizing our web page content based on visitors’ browser type and/or other information.
        </p>

        <h2>Google DoubleClick DART Cookie</h2>
        <p>
          Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to{' '}
          <a href="https://this person does not exist.cc/" className={styles.link}>
            https://this person does not exist.cc/
          </a>{' '}
          and other sites on the internet. –{' '}
        </p>

        <h2>Advertising Partners Privacy Policies</h2>
        <p>
          You can look through this list to find out the Privacy Policy for each of our partners of This Person Does Not Exist.
        </p>

        <p>
          Third-party ad servers or ad networks use the following technologies: cookies, JavaScript, Web Beacons etc. They are used in their respective advertisements and links that appear on This Person Does Not Exist, and after click they are sent directly to users’ browsers. They automatically save your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you can see on websites that you visit.
        </p>

        <p>
          You should know that This Person Does Not Exist has no access to or control over these cookies that are used by third-party advertisers.
        </p>

        <h2>Third Party Privacy Policies</h2>
        <p>
          This Person Does Not Exist Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for additional information. It may include their instructions about how to opt-out of certain options.
        </p>

        <p>
          If you want, you have such an opportunity to disable cookies through your personal browser options. To know some additional information about cookie management with specific web browsers, it can be found at the browsers’ respective websites.
        </p>

        <h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
        <p>
          Under the CCPA, around other rights, guests from California have the right to:
        </p>
        <ul>
          <li>Request that a business that gathers a consumer’s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
          <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
          <li>Request that a business not to sell the consumer’s personal data.</li>
        </ul>
        <p>
          If you make a request, we have to reply to you during the month. If you would like to try any of these rights, please contact us.
        </p>

        <h2>GDPR Data Protection Rights</h2>
        <p>
          We would like to know exactly that you are fully aware of all of your data protection rights. Every user is entitled to the following:
        </p>
        <ul>
          <li>The right to access – We have to provide you all copies of your personal data, if you request it.</li>
          <li>The right to rectification – We have to correct any information you believe is inaccurate. You also can request that we complete the information you think is incomplete.</li>
          <li>The right to erasure – We have to erase your personal data, under certain conditions (if you request it).</li>
          <li>The right to restrict processing – We have to restrict the processing of your personal data, under certain conditions (if you request it).</li>
          <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
          <li>The right to data portability – We have to transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
        </ul>
        <p>
          If you make a request, we have to reply to you during the month. If you would like to try any of these rights, please contact us.
        </p>

        <h2>Children’s Information</h2>
        <p>
          There is another part of our priority. We try to protect children while they are using the internet. We ask parents and guardians to observe, participate in, and/or monitor and guide their online activity.
        </p>
        <p>
          This Person Does Not Exist does not knowingly collect any Personal Identifiable Information from children under the age of 13. If it seems to you that your child may have provided his or her personal information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;