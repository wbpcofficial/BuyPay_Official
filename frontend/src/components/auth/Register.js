import React, { useState, useEffect } from "react";
import { register } from "../../services";
import { emailValid } from "../../utils";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      validateInput();
    }
  }, [name, email, password, confirmPassword]);

  const validateInput = () => {
    let hasError = false;

    if (name.trim().length === 0) {
      setNameError("Name is required.");
      hasError = true;
    } else {
      setNameError(null);
    }

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (validateInput()) {
      try {
        await register({
          name,
          email,
          password,
        });
        history.push("/");
      } catch (e) {
        console.log(e.message);
        setSubmitError(e.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Register</div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <label className="col-md-4 col-form-label text-md-right">
                    Name
                  </label>

                  <div className="col-md-6">
                    <input
                      id="name"
                      type="text"
                      className={
                        "form-control" + (nameError ? " is-invalid" : "")
                      }
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && (
                      <span className="invalid-feedback" role="alert">
                        <strong>{nameError}</strong>
                      </span>
                    )}
                  </div>
                </div>

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
    </div>
  );
};
export default Register;
