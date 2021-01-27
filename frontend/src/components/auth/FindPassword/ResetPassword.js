import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { checkToken, resetPassword } from "../../../services";
import { emailValid } from "../../../utils";

import CustomInput from "../../FormComponents/Input/CustomInput";
import styles from "../Auth.module.scss";

const ResetPassword = ({ history }) => {
  const email = localStorage.getItem("email");

  const [resetToken, setToken] = useState(null);
  const [flag, setFlag] = useState(true);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [message, setMessage] = useState(null);

  const { register, handleSubmit, errors } = useForm();

  const getResetToken = () => {
    let path = history.location.pathname;
    let res = path.split("/");
    setToken(res[2]);
  };

  useEffect(() => {
    getResetToken();
  }, []);

  const validateInput = (password, passwordconfirm) => {
    let hasError = false;
    setError(false);
    setMessage(null);

    if (password === passwordconfirm) {
      if (!emailValid(email.trim())) {
        setEmailError("Email is invalid");
        hasError = true;
      } else {
        setEmailError(null);
      }
    } else {
      setError(true);
      setMessage("Password does not match");
    }

    return !hasError;
  };

  const onSubmit = async ({ password, passwordconfirm }) => {
    if (validateInput(password, passwordconfirm)) {
      try {
        let data = { email };
        if (password && password.length > 0) {
          data["password"] = password;
          data["resetToken"] = resetToken;
        }
        let response = await resetPassword(data);
        if (response.success) {
          history.push("/success");
        } else {
          setMessage("An error is occured");
        }
      } catch (e) {
        console.log(e.message);
        setSubmitError(e.message);
        setMessage(null);
      }
    }
  };
  return (
    <>
      {flag && (
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
                      required: {
                        value: true,
                        message: "A Password is required",
                      },
                    })}
                    error={error}
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
                      required: {
                        value: true,
                        message: "Password does not match",
                      },
                    })}
                    error={error}
                  />
                </div>
                {message && <span className={styles.Error}>{message}</span>}
              </div>

              <button className={styles.LoginBtn} type="submit">
                <div className={styles.Text}>DONE</div>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
