import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { registerUser, getCaptcha } from "../../services";
import { emailValid } from "../../utils";
import Card from "../Card/Card";
import CustomInput from "../FormComponents/Input/CustomInput";
import styles from "./Auth.module.scss";
var lightwallet = require("../../utils/web3/lightwallet.min.js");

const CardStyle = {};

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  // captcha
  const [captchaText, setCaptchaText] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [checkFlag, setCheckFlag] = useState(false);
  const [checkText, setCheckText] = useState("check");
  const [flag, setFlag] = useState(true);

  // check box
  const [checkAgg, setCheckAgg] = useState(false);

  // address
  //  prv_key,
  //         keystorage,
  //         secretSeed,

  const [addr, setAddr] = useState(null);
  const [prv_key, setPrvkey] = useState(null);
  const [keystorage, setKeystorage] = useState(null);
  const [secretSeed, setSecretSeed] = useState(null);

  useEffect(() => {
    Captcha();
    generate_address();
  }, []);

  useEffect(() => {
    if (submitted) {
      validateInput(email, password, confirmPassword);
    }
  }, [email, password, confirmPassword]);

  const validateInput = (email, password, confirmPassword) => {
    let hasError = false;

    if (email.trim().length === 0) {
      setEmailError("Email is required.");
      hasError = true;
    } else if (!emailValid(email.trim())) {
      setEmailError("Email is invalid");
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (password.length === 0) {
      setPasswordError("Password is required.");
      hasError = true;
    } else {
      setPasswordError(null);

      if (confirmPassword !== password) {
        setConfirmPasswordError("Password does not match.");
        hasError = true;
      } else {
        setConfirmPasswordError(null);
      }
    }
    return !hasError;
  };
  const generate_address = () => {
    var password = "buypaywallet";
    var secretSeed = "";
    if (secretSeed == "")
      secretSeed = lightwallet.keystore.generateRandomSeed();

    lightwallet.keystore.deriveKeyFromPassword(
      password,
      (err, pwDerivedKey) => {
        var ks = new lightwallet.keystore(secretSeed, pwDerivedKey);
        ks.generateNewAddress(pwDerivedKey, 1);
        var addr = ks.getAddresses();
        var prv_key = ks.exportPrivateKey(addr, pwDerivedKey);
        var keystorage = ks.serialize();
        console.log(1);
        setAddr(addr[0]);
        setPrvkey(prv_key);
        setKeystorage(keystorage);
        setSecretSeed(secretSeed);
        console.log("..............................addr...................");
        console.log(secretSeed);
      }
    );
  };

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
    console.log(e.target.value);
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

  const handleChangeEmail = (e) => {
    setSubmitError("");
  };

  const handleChangeCheckAgg = (e) => {
    setCheckAgg(e.target.checked);
  };

  const onSubmit = async ({ email, password, confirmPassword }) => {
    // event.preventDefault();
    setSubmitted(true);
    if (validateInput(email, password, confirmPassword)) {
      try {
        await registerUser({
          email,
          password,
          addr,
          prv_key,
          keystorage,
          secretSeed,
        });
        history.push("/");
      } catch (e) {
        console.log(e.message);
        setSubmitError(e.message);
      }
    }
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Card} style={{ height: "1101px" }}>
          <div className={styles.LoginIcon}>
            <img src="../assets/icons/register.png" />
          </div>
          <div className={styles.Title}>
            Make <strong> &nbsp;buypay Wallet</strong>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.InputContainer}>
              <div className={styles.EmailInput}>
                <CustomInput
                  label="Email"
                  placeholder="Enter Your Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  formRef={register({
                    required: { value: true, message: "An Email is required" },
                  })}
                  onChange={(e) => handleChangeEmail(e)}
                  error={errors.email}
                />
                {submitError && (
                  <span className={styles.Error}>{submitError}</span>
                )}
              </div>
              <div className={styles.PasswordInput}>
                <CustomInput
                  label="Password"
                  placeholder="Enter Your Password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  formRef={register({
                    required: {
                      value: true,
                      message: "A password is required",
                    },
                  })}
                  error={errors.password}
                />
              </div>
              <div className={styles.PasswordInput}>
                <CustomInput
                  label="Password Confirm"
                  placeholder="Enter Your Password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="password"
                  formRef={register({
                    required: {
                      value: true,
                      message: "Password does not match",
                    },
                  })}
                  error={errors.confirmPassword}
                />
                {confirmPasswordError && (
                  <span className={styles.Error}>{confirmPasswordError}</span>
                )}
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
              <div className={styles.CheckContainer}>
                <input
                  type="checkbox"
                  className={styles.CheckBox}
                  onChange={(e) => handleChangeCheckAgg(e)}
                />
                <div className={styles.checkText}>
                  I consent to this agreement and pledge to abide by its
                  regulations.
                </div>
              </div>
              <div className={styles.Register}>
                <button
                  type="submit"
                  className={
                    checkFlag && checkAgg
                      ? `${styles.MakeWallet} ${styles.active}`
                      : styles.MakeWallet
                  }
                >
                  <div className={styles.Text}>Make Wallet</div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Register</div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-md-4 col-form-label text-md-right">
                      Email Address
                    </label>

                    <div className="col-md-6">
                      <input
                        id="email"
                        type="email"
                        className={
                          "form-control" + (emailError ? " is-invalid" : "")
                        }
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      {emailError && (
                        <span className="invalid-feedback" role="alert">
                          <strong>{emailError}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-4 col-form-label text-md-right">
                      Password
                    </label>

                    <div className="col-md-6">
                      <input
                        id="password"
                        type="password"
                        className={
                          "form-control" + (passwordError ? " is-invalid" : "")
                        }
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      {passwordError && (
                        <span className="invalid-feedback" role="alert">
                          <strong>{passwordError}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-4 col-form-label text-md-right">
                      Confirm Password
                    </label>

                    <div className="col-md-6">
                      <input
                        id="password-confirm"
                        type="password"
                        className={
                          "form-control" +
                          (confirmPasswordError ? " is-invalid" : "")
                        }
                        name="password_confirmation"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      {confirmPasswordError && (
                        <span className="invalid-feedback" role="alert">
                          <strong>{confirmPasswordError}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group row mb-0">
                    <div className="col-md-6 offset-md-4">
                      {submitError && (
                        <div className="pb-3 text-danger">
                          <strong>{submitError}</strong>
                        </div>
                      )}
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default Register;
