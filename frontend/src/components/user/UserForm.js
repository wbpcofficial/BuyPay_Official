import React, { useState, useEffect } from "react";
import { register } from "../../services";
import { emailValid, getAuth } from "../../utils";
import { UserType } from "../../constants";

const UserForm = ({ data, error, onSubmit, submitButtonText, onCancel }) => {
  const [name, setName] = useState(data ? data.name || "" : "");
  const [email, setEmail] = useState(data ? data.email || "" : "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(data ? data.role : "regular");
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    if (submitted) {
      validateInput();
    }
  }, [name, email, password]);

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

    if (!data && password.length === 0) {
      setPasswordError("Password is required.");
      hasError = true;
    } else {
      setPasswordError(null);
    }

    return !hasError;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitted(true);
    if (validateInput()) {
      let data = {
        email,
        name,
      };

      if (password && password.length > 0) {
        data["password"] = password;
      }

      if (role && role.length > 0) {
        data["role"] = role;
      }
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group row">
        <label className="col-md-4 col-form-label text-md-right">Name</label>

        <div className="col-md-6">
          <input
            id="name"
            type="text"
            className={"form-control" + (nameError ? " is-invalid" : "")}
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
            className={"form-control" + (emailError ? " is-invalid" : "")}
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
            className={"form-control" + (passwordError ? " is-invalid" : "")}
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
          User Type
        </label>
        <div className="col-md-6">
          <select
            className="form-control"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            disabled={
              (data && auth.user.id === data.id) ||
              auth.user.role !== UserType.Admin
            }
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="regular">Regular</option>
          </select>
        </div>
      </div>

      <div className="form-group row mb-0">
        <div className="col-md-6 offset-md-4">
          {error && (
            <div className="pb-3 text-danger">
              <strong>{error}</strong>
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            {submitButtonText}
          </button>
          <button className="ml-2 btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
export default UserForm;
