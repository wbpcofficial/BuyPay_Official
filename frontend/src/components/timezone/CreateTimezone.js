import React, { useState, useEffect } from "react";
import TimezoneForm from "./TimezoneForm";
import { createTimezone } from "../../services";

const CreateTimezone = ({ history }) => {
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      await createTimezone(data);
      history.push("/");
    } catch (e) {
      console.log(e.message);
      setSubmitError(e.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header font-weight-bold">Create Timezone</div>
            <div className="card-body">
              <TimezoneForm
                submitButtonText="Create Timezone"
                onSubmit={handleSubmit}
                error={submitError}
                onCancel={() => history.goBack()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTimezone;
