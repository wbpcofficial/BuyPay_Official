import React from "react";
import styles from "./index.module.scss";
import { option_etherscan_address } from "../../constants";
const Card = ({ style, title, content, isCard = true, ...props }) => {
  const imgLink =
    title === "Address"
      ? "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=" +
        content +
        "&choe=UTF-8&chld=L|0"
      : "";
  const addressLink = option_etherscan_address + content;
  return (
    <div className={style}>
      {isCard && (
        <div style={{ display: "flex" }}>
          <div className={styles.imgContainer}>
            {title === "Address" && <img src={imgLink} alt="" />}
            {title === "Balance" && (
              <div
                style={{
                  backgroundColor: "#2a46ac",
                }}
              >
                <img
                  src="/assets/images/balance.svg"
                  style={{ width: "32px", height: "32px", marginTop: "14px" }}
                  alt=""
                />
              </div>
            )}
            {title === "Network" && (
              <div
                style={{
                  backgroundColor: "#2085a5",
                }}
              >
                <img
                  src="/assets/images/network.svg"
                  style={{ width: "26px", height: "42px", marginTop: "9px" }}
                  alt=""
                />
              </div>
            )}
          </div>
          <div style={{ width: "calc(100% - 76px)" }}>
            <p className={styles.title}>{title}</p>
            {title === "Address" ? (
              <p className={styles.content}>
                <a rel="noreferrer" href={addressLink} target="_blank">
                  {content}
                </a>
              </p>
            ) : (
              <p className={styles.content}>{content}</p>
            )}
          </div>
        </div>
      )}
      {props.children}
    </div>
  );
};

export default Card;
