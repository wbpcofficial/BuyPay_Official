import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { getCaptcha, forgotPassword } from "../../../services";
import CustomInput from "../../FormComponents/Input/CustomInput";
import styles from "../Auth.module.scss";

const FindPassword = ({ history }) => {
  const [captchaText, setCaptchaText] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [checkFlag, setCheckFlag] = useState(false);
  const [checkText, setCheckText] = useState("check");
  const [flag, setFlag] = useState(true);
  const { register, handleSubmit, errors } = useForm();
  const ref = useRef(null);

  useEffect(() => {
    Captcha();
  }, []);

  const Captcha = async () => {
    try {
      const { success, data } = await getCaptcha();
      setCaptchaText(data.text);
      setCaptchaImage(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const refreshCaptcha = () => {
    Captcha();
  };

  const onChangeCaptcha = (e) => {
    setCheckText("check");
    setCheckFlag(false);
    setFlag(true);
    setCaptchaInput(e.target.value);
  };

  const checkCaptcha = () => {
    if (captchaInput === captchaText) {
      setCheckFlag(true);
      setFlag(true);
    } else {
      setCheckFlag(false);
      setFlag(false);
      setCheckText("try again");
      Captcha();
    }
  };

  const handleClickBack = () => {
    history.goBack();
  };

  const onSubmit = async ({ email }) => {
    let data = { email };
    try {
      await forgotPassword(data);
      localStorage.setItem("email", email);
      history.push({
        pathname: "/findpassword/messagesent",
        state: { email: email },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Card}>
          <div className={styles.LoginIcon}>
            <img src="../assets/icons/find_password.png" />
          </div>
          <div className={styles.Title}>
            Find Your<strong> &nbsp;Password</strong>
          </div>
          <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.InputContainer}>
              <div className={styles.IdInput}>
                <CustomInput
                  label="Email"
                  placeholder="Enter Your Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  formRef={register({
                    required: { value: true, message: "An Email is required" },
                  })}
                  error={errors.email}
                />
              </div>

              <div className={styles.Captcha}>
                <div dangerouslySetInnerHTML={{ __html: captchaImage }}></div>
                <div className={styles.refresh} onClick={refreshCaptcha}>
                  <img
                    src="../assets/icons/refresh.png"
                    className={styles.vector}
                  />
                </div>
              </div>

              <div className={styles.CaptchaInput}>
                <CustomInput
                  label="Captcha"
                  placeholder="Enter the letters from the image"
                  name="captcha"
                  type="string"
                  onChange={(e) => onChangeCaptcha(e)}
                  error={!flag}
                />
                {captchaInput &&
                  (checkFlag ? (
                    <div className={styles.checkBtn}>
                      <img src="../assets/icons/check.png" />
                    </div>
                  ) : (
                    <div
                      className={flag ? styles.checkBtn : styles.TryagainBtn}
                      onClick={checkCaptcha}
                    >
                      {checkText}
                    </div>
                  ))}
                {!flag && (
                  <span className={styles.Error}>
                    It doesn't match from image
                  </span>
                )}
              </div>
            </div>

            <div className={styles.ButtonGroup}>
              <button className={styles.Back} onClick={handleClickBack}>
                Back
              </button>
              <button
                type="submit"
                className={
                  checkFlag ? `${styles.Next} ${styles.active}` : styles.Next
                }
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FindPassword;
