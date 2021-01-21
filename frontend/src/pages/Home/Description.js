import React from "react";
import styles from "./index.module.scss";
const Description = () => {
  return (
    <div className={styles.description}>
      <div className={styles.flexblock}>
        <div className={styles.card}>
          <img src="/assets/images/wallet_icon.svg" />
          <div className={styles.content}>
            <p className={styles.title}>buypay.io</p>
            <p className={styles.text}>
              Lorem Ipsum is simply dummy text of the printing and typesettin
              industry.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <img src="/assets/images/wallet_icon.svg" />
          <div className={styles.content}>
            <p className={styles.title}>buypay.io</p>
            <p className={styles.text}>
              Lorem Ipsum is simply dummy text of the printing and typesettin
              industry.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.flexblock}>
        <div className={styles.card}>
          <img src="/assets/images/wallet_icon.svg" />
          <div className={styles.content}>
            <p className={styles.title}>buypay.io</p>
            <p className={styles.text}>
              Lorem Ipsum is simply dummy text of the printing and typesettin
              industry.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <img src="/assets/images/wallet_icon.svg" />
          <div className={styles.content}>
            <p className={styles.title}>buypay.io</p>
            <p className={styles.text}>
              Lorem Ipsum is simply dummy text of the printing and typesettin
              industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
