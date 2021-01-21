import React from "react";
import styles from "./index.module.scss";
const MainBg = () => {
  return (
    <div className={styles.mainBg}>
      <div className={styles.fistSection}>
        <div className={styles.sentence}>
          <p className={styles.title}>
            My Ethereum Wallet is a <span>free</span>
          </p>
          <p className={styles.content}>
            My Ether Wallet (our friends call us MEW) is a free, client-side
            interface helping you interact with the Ethereum blockchain. Our
            easy-to-use, open-source platformallows you to generate wallets,
            interact with smart contracts, and so much more.
          </p>
        </div>
        <div className={styles.bgImg}>
          <img src="/assets/images/top_bg.png"></img>
        </div>
      </div>

      <div className={styles.secondSection}>
        <div className={styles.card}>
          <img src="/assets/images/card1.png"></img>
          <div className={styles.content}>
            <div className={styles.title}>
              <p>buypay.io</p>
            </div>
            <div className={styles.text}>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesettin
                industry.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <img src="/assets/images/card2.png"></img>
          <div className={styles.content}>
            <div className={styles.whiteTitle}>
              <p>buypay.io</p>
            </div>
            <div className={styles.whiteText}>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesettin
                industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBg;
