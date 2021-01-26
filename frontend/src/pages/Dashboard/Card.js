import React from "react";
import styles from "./index.module.scss";
const Card = ({ style, title, content, isCard = true, ...props }) => {
  return (
    <div className={style}>
      {isCard && (
        <div style={{ display: "flex" }}>
          <div className={styles.imgContainer}></div>
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
