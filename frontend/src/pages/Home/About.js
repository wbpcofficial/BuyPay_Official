import React from "react";
import styles from "./index.module.scss";
const About = () => {
  return (
    <div className={styles.about}>
      <img src="/assets/images/wallet_vision.png"></img>
      <div className={styles.content}>
        <p className={styles.title}>About</p>
        <p className={styles.title}>buypay Wallet</p>
        <p className={styles.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>
    </div>
  );
};

export default About;
