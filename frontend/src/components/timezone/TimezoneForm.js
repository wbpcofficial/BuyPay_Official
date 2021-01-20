import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const TimezoneForm = ({ data, error, onSubmit, submitButtonText, onCancel }) => {
  const [name, setName] = useState(data ? data.name : "");
  const [city, setCity] = useState(data ? data.city : "");
  const [timeDiff, setTimeDiff] = useState(data ? String(data.timeDiff) : "");
  const [nameError, setNameError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [timeDiffError, setTimeDiffError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [now, setNow] = useState(moment());
  useEffect(() => {
    if (submitted) {
      validateInput();
    }
  }, [name, city, timeDiff]);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const validateInput = () => {
    let hasError = false;

    if (name.trim().length === 0) {
      setNameError("Name is required.");
      hasError = true;
    } else {
      setNameError(null);
    }

    if (city.trim().length === 0) {
      setCityError("City is required.");
      hasError = true;
    } else {
      setCityError(null);
    }

    if (timeDiff.trim().length === 0) {
      setTimeDiffError("Time difference to GMT is required.");
      hasError = true;
    } else if (isNaN(timeDiff)) {
      setTimeDiffError("Time difference to GMT must be number.");
      hasError = true;
    } else if (parseFloat(timeDiff) < -12 || parseFloat(timeDiff) > 12) {
      setTimeDiffError("Time difference to GMT must be between -12 and 12.");
      hasError = true;
    } else {
      setTimeDiffError(null);
    }
    return !hasError;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (validateInput()) {
      onSubmit({
        city: city.trim(),
        name: name.trim(),
        timeDiff,
      });
    }
  };

  const time = timeDiff === '-0' || String(parseInt(timeDiff)) === timeDiff ? now.utcOffset(parseInt(timeDiff) * 60) : now;

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
        <label className="col-md-4 col-form-label text-md-right">City</label>

        <div className="col-md-6">
          <input
            id="city"
            type="text"
            className={"form-control" + (cityError ? " is-invalid" : "")}
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          {cityError && (
            <span className="invalid-feedback" role="alert">
              <strong>{cityError}</strong>
            </span>
          )}
        </div>
      </div>

      <div className="form-group row">
        <label className="col-md-4 col-form-label text-md-right">
          Time difference to GMT
        </label>

        <div className="col-md-6">
          <input
            id="timeDiff"
            type="number"
            className={"form-control" + (timeDiffError ? " is-invalid" : "")}
            name="timeDiff"
            value={timeDiff}
            onChange={(e) => setTimeDiff(e.target.value)}
          />

          {timeDiffError && (
            <span className="invalid-feedback" role="alert">
              <strong>{timeDiffError}</strong>
            </span>
          )}
        </div>
      </div>

      <div className="form-group row">
        <label className="col-md-4 col-form-label text-md-right">Time</label>

        <div className="col-md-6">
          <label className="col-form-label text-md-right">
            {time.format("MMM DD, HH:mm:ss")}
          </label>
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

export default TimezoneForm;
