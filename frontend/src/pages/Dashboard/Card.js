import React from "react";
import styles from "./index.module.scss";
const Card = ({ style, title, content, isCard = true, ...props }) => {
  const imgLink =
    title === "Address"
      ? "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=" +
        content +
        "&choe=UTF-8&chld=L|0"
      : "";
  return (
    <div className={style}>
      {isCard && (
        <div style={{ display: "flex" }}>
          <div className={styles.imgContainer}>
            {title === "Address" && <img src={imgLink} />}
            {title === "Balance" && (
              <div
                style={{
                  backgroundColor: "#2a46ac",
                }}
              >
                <img
                  src="/assets/images/balance.svg"
                  style={{ width: "32px", height: "32px", marginTop: "14px" }}
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
                />
              </div>
            )}
          </div>
          <div style={{ width: "calc(100% - 76px)" }}>
            <p className={styles.title}>{title}</p>
            <p className={styles.content}>{content}</p>
          </div>
        </div>
      )}
      {props.children}
    </div>
  );
};

export default Card;
