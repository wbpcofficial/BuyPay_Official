import React from "react";
import styles from "./index.module.scss";
const Top = () => {
  return (
    <div className={styles.top}>
      <p className={styles.title}>Wallet</p>
      <div>
        <div className={styles.btn}>Kyc View</div>
        <div className={styles.btn}>Edit</div>
      </div>
    </div>
  );
};

export default Top;
