import React from "react";
import styles from "./index.module.scss";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.company}>
          <p className={styles.title}>buypay.io</p>
          <p className={styles.text}>
            Lorem Ipsum is simply dummy tex Lorem Ipsum is simply dummy text of
            the printing and typesetting industry.
          </p>
        </div>
        <div className={styles.contactus}>
          <div className={styles.sitemap}>
            <div className={styles.title}>SITEMAP</div>
            <div className={styles.text}>
              <a>Home</a>
              <a>Technology</a>
              <a>Services</a>
              <a>About</a>
            </div>
          </div>
          <div className={styles.contact}>
            <div className={styles.title}>CONTACT</div>
            <div className={styles.text}>+ 123 45 67 890</div>
            <div className={styles.text}>buypay@support.com</div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>All Rights Reserved byapay.io</div>
    </div>
  );
};

export default Footer;
