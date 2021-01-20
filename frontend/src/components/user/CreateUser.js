import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import { createUser } from "../../services";

const CreateUser = ({ history }) => {
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      await createUser(data);
      history.push("/users");
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
            <div className="card-header font-weight-bold">Create User</div>
            <div className="card-body">
              <UserForm
                submitButtonText="Create User"
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

export default CreateUser;
