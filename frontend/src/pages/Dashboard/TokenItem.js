import React from "react";
import styles from "./index.module.scss";
const TokenItem = ({ address, symbol, balance }) => {
  const link = "https://kovan.etherscan.io/address/" + address;
  return (
    <div className={styles.tokenItem}>
      <div className={styles.tokenSymbol}>
        <span>
          <a rel="noreferrer" target="_blank" href={link}>
            {symbol}
          </a>
        </span>
      </div>
      <div className={styles.tokenBalance}>
        <span className={styles.tokenbalance}>{balance}</span>
        <span className={styles.close}>
          <span>+</span>
        </span>
      </div>
    </div>
  );
};

export default TokenItem;
