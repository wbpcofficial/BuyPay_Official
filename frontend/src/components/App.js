import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import AuthRoute from "./AuthRoute";
import Header from "./layout/Header";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import TimezoneList from "./timezone/TimezoneList";
import CreateTimezone from "./timezone/CreateTimezone";
import EditTimezone from "./timezone/EditTimezone";
import UserList from "./user/UserList";
import CreateUser from "./user/CreateUser";
import EditUser from "./user/EditUser";
import Profile from "./auth/Profile";
import { getAuth } from "../utils";
import AppContext from "./AppContext";

function App() {
  const [auth, setAuth] = useState(getAuth());
  return (
    <Router>
      <AppContext.Provider value={{ auth, setAuth }}>
        <div className="App">
          <Header />

          <div className="main">
            <Switch>
              <AuthRoute exact path="/">
                <Redirect to="/timezones" />
              </AuthRoute>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <AuthRoute exact path="/profile" component={Profile} />
              <Route exact path="/logout" component={Logout} />

              <AuthRoute exact path="/timezones" component={TimezoneList} />
              <AuthRoute
                exact
                path="/timezones/new"
                component={CreateTimezone}
              />
              <AuthRoute
                exact
                path="/timezones/:timezoneId/edit"
                component={EditTimezone}
              />

              <AuthRoute
                permit="admin,manager"
                exact
                path="/users"
                component={UserList}
              />
              <AuthRoute
                permit="admin,manager"
                exact
                path="/users/new"
                component={CreateUser}
              />
              <AuthRoute
                permit="admin,manager"
                exact
                path="/users/:userId/edit"
                component={EditUser}
              />

            </Switch>
          </div>
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
