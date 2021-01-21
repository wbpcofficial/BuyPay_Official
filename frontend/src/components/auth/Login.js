import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../services";
import CustomInput from "../FormComponents/Input/CustomInput";
import styles from "./Login.module.scss";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState(null);

  const { register, handleSubmit, errors} = useForm();

  const onSubmit = async ({ email, password}) => {
    try {
      await login({
        email,
        password,
      });
      history.push("/");
    } catch (e) {
      console.log(e.message);
      setSubmitError(e.message);
    }
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Card}>
          <div className={styles.LoginIcon}>
            <img src="../assets/icons/visual_login.png" />
          </div>
          <div className={styles.Title}>
            Welcome to<strong> &nbsp;buypay</strong>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.InputContainer}>
              <div className={styles.IdInput}>
                <CustomInput
                  label="ID"
                  placeholder="Enter Your ID"
                  name="email"
                  type="email"
                  autoComplete="id"
                  formRef={register({
                    required: { value: true, message: "An Id is required" },
                  })}
                  error={errors.id}
                />
              </div>

              <div className={styles.PasswordInput}>
                <CustomInput
                  label="Password"
                  placeholder="Enter Your Password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  formRef={register({
                    required: { value: true, message: "A password is required" },
                  })}
                  error={errors.password}
                />
              </div>
            </div>
            
            <div className={styles.FindBtnGroup}>
              <div className={styles.FindID}><div>Find Id</div></div>
              <div className={styles.Bar}></div>
              <div className={styles.FindPassword}><div>Find Password</div></div>
            </div>

            <button className={styles.LoginBtn}>
              <div className={styles.Text}>LOGIN</div>
            </button>

            <div className={styles.Footer}>
              <div className={styles.Quiz}>Don't have an account?</div>
              <div className={styles.Register}>Register</div>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Login</div>

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
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
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
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
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
                        Login
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

export default Login;
