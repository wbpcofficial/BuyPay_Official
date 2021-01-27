import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TimezoneForm from "./TimezoneForm";
import { updateTimezone, fetchTimezone } from "../../services";

const EditTimezone = ({ history }) => {
  const [submitError, setSubmitError] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const { timezoneId } = useParams();
  async function loadTimezone() {
    try {
      const fetched = await fetchTimezone(timezoneId);
      setTimezone(fetched);
    } catch (e) {
      history.push("/timezones");
    }
  }

  useEffect(() => {
    loadTimezone();
  }, [history, timezoneId]);

  const handleSubmit = async (data) => {
    try {
      await updateTimezone(timezoneId, data);
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
            <div className="card-header">Update Timezone</div>
            <div className="card-body">
              {timezone && (
                <TimezoneForm
                  submitButtonText="Update Timezone"
                  onSubmit={handleSubmit}
                  error={submitError}
                  data={timezone}
                  onCancel={() => history.goBack()}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTimezone;
