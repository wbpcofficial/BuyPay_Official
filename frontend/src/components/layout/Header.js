import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { getAuth } from "../../utils";
import { UserType } from "../../constants";
import AppContext from "../AppContext";
import styles from "./Header.module.scss";

const Header = ({ history }) => {
  const appContext = useContext(AppContext);
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    setAuth(getAuth());
  }, [history.location, appContext.auth]);

  let role = null;
  if (auth) {
    if (auth.user.role === UserType.Manager) {
      role = "MANAGER";
    } else if (auth.user.role === UserType.Admin) {
      role = "ADMIN";
    }
  }

  const ToLogin = () => {
    history.push("/login");
  };

  const ToSignUp = () => {
    history.push("/register");
  };
  const ToHome = () => {
    history.push("/");
  };

  return (
    <>
      <div className={styles.Header}>
        <div className={styles.Brand}>
          <img src="../assets/logo/buypay_logo.png" onClick={ToHome} />
        </div>

        <div className={styles.ButtonGroup}>
          {auth && (
            <React.Fragment>
              <div className={styles.Login}>
                <div className={styles.LoginText} onClick={ToLogin}>
                  Log in
                </div>
              </div>
              <div className={styles.Signup}>
                <div className={styles.SignupText} onClick={ToSignUp}>
                  Sign up
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
      {/* <Navbar collapseOnSelect expand="md" variant="dark" bg="primary">
        <Navbar.Brand as={Link} to="/">
          buypay
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {auth && (
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/timezones">
                {auth.user.role === UserType.Admin
                  ? "All Timezones"
                  : "Timezones"}
              </Nav.Link>

              {(auth.user.role === UserType.Manager ||
                auth.user.role === UserType.Admin) && (
                  <Nav.Link as={Link} to="/users">
                    Manage Users
                  </Nav.Link>

                )}
            </Nav>
          )}

          <Nav className="ml-auto">
            {!auth && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
            {auth && (
              <NavDropdown title={auth.user.name} id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/logout">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>

      </Navbar> */}
    </>
  );
};

export default withRouter(Header);
