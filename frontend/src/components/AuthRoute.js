import React from "react";
import { Route, Redirect } from "react-router-dom";
import moment from "moment-timezone";

const AuthRoute = ({ permit, component: Component, children, ...rest }) => {
  let isAuthenticated = true;
  let permitted = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth) {
    const { expires } = auth.token;
    if (moment(expires) < moment()) {
      
      localStorage.removeItem("auth");
      isAuthenticated = false;
    }
  } else {
    isAuthenticated = false;
  }

  if (permit && isAuthenticated) {
    const { user } = auth;
    permitted = permit.split(",").includes(user.role);
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true ? (
          permitted ? (
            <Component {...props} />
          ) : (
            <Redirect to="/timezone" />
          )
        ) : (
          <Redirect to="/" />
        )
      }
    >
      {children}
    </Route>
  );
};

export default AuthRoute;
