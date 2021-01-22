import React, { useState } from "react";
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
import Home from "../pages/Home";
import FindPassword from "./auth/FindPassword";
import ChangePassword from "./auth/ChangePassword";

function App() {
  const [auth, setAuth] = useState(getAuth());
  return (
    <Router>
      <AppContext.Provider value={{ auth, setAuth }}>
        <div className="App">
          <Header />

          <div className="main">
            <Switch>
              {/* <AuthRoute exact path="/">
                <Redirect to="/" />
              </AuthRoute> */}
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/findpassword" component={FindPassword} />
              <Route exact path="/changepassword" component={ChangePassword} />
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
