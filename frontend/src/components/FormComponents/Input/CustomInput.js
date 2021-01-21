import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

import styles from "./CustomInput.module.scss";

const CustomInput = ({ id, name, label, formRef, error, placeholder, ...props }) => {
  return (
    <div className={styles.Field}>
      {label && (
        <label htmlFor={id || name} className={styles.Label}>
          {label}
        </label>
      )}
      <div className={styles.InputContainer}>
        <input
          placeholder={placeholder}
          className={error ? styles.InputError : styles.Input}
          id={id}
          name={name}
          ref={formRef}
          {...props}
        />
      </div>
      {error?.message && <span className={styles.Error}>{error.message}</span>}
    </div>
  )
}

export default CustomInput;