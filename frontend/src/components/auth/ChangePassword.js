import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { getCaptcha } from "../../services";
import CustomInput from "../FormComponents/Input/CustomInput";
import styles from "./Auth.module.scss";

const ChangePassword = ({ history }) => {
  const { register, handleSubmit, errors} = useForm();
  const onSubmit = async () => {

  }
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Card}>
          <div className={styles.LoginIcon}>
            <img src="../assets/icons/changepassword.png" />
          </div>
          <div className={styles.Title}>
            Change Your<strong> &nbsp;Password</strong>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.InputContainer}>
              <div className={styles.IdInput}>
                <CustomInput
                  label="Password"
                  placeholder="Enter Your New Password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  formRef={register({
                    required: { value: true, message: "A Password is required" },
                  })}
                  error={errors.password}
                />
              </div>

              <div className={styles.PasswordInput}>
                <CustomInput
                  label="Password Confirm"
                  placeholder="Confirm Your Password"
                  name="passwordconfirm"
                  type="password"
                  autoComplete="password"
                  formRef={register({
                    required: { value: true, message: "Password does not match" },
                  })}
                  error={errors.passwordconfirm}
                />
              </div>
            </div>
            
            <button className={styles.LoginBtn} type="submit">
              <div className={styles.Text}>DONE</div>
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default ChangePassword;
