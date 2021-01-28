import React from "react";
import styles from "./index.module.scss";
const Modal = ({ title, onClose, ...props }) => {
  return (
    <>
      <div
        className={styles.mask}
        onClick={() => {
          onClose(false);
        }}
      ></div>
      <div className={styles.content}>
        <div className={styles.nav}>
          <span className={styles.title}>{title}</span>
          <span
            className={styles.close}
            onClick={() => {
              onClose(false);
            }}
          >
            +
          </span>
        </div>
        <div style={{ textAlign: "center" }}>{props.children}</div>
      </div>
    </>
  );
};

export default Modal;
