import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserForm from "./UserForm";
import { updateUser, fetchUser } from "../../services";
import { getAuth, saveAuth } from "../../utils";

const EditUser = ({ history }) => {
  const [submitError, setSubmitError] = useState(null);
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const auth = getAuth();
  async function loadUser() {
    try {
      const fetched = await fetchUser(userId);
      setUser(fetched);
    } catch (e) {
      history.push("/users");
    }
  }

  useEffect(() => {
    console.log(history, userId);
    loadUser();
  }, [history, userId]);

  const handleSubmit = async (data) => {
    try {
      const updatedUser = await updateUser(userId, data);
      if (userId === auth.user.id) {
        auth.user = updatedUser;
        saveAuth(auth);
      }
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
            <div className="card-header">Update User</div>
            <div className="card-body">
              {user && (
                <UserForm
                  submitButtonText="Update User"
                  onSubmit={handleSubmit}
                  error={submitError}
                  data={user}
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

export default EditUser;
