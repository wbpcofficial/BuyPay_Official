import React, { useState, useRef, useEffect, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { getAuth } from "../../utils";
import { UserType } from "../../constants";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import AppContext from "../AppContext";
import styles from './Header.module.scss';

const Header = ({ history }) => {
  const appContext = useContext(AppContext);
  const [auth, setAuth] = useState(false);
  const ref = useRef(null);
  // console.log(appContext.auth);
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


  return (
    <>
      <div className={styles.Header}>
        <div className={styles.Brand}>
          <div>buypay</div>
        </div>

        <div className={styles.ButtonGroup}>
          <div className={styles.Login}>
            <div className={styles.LoginText}>
              Log in
            </div>
          </div>
          <div className={styles.Signup}>
            <div className={styles.SignupText}>
              Sign up
            </div>
          </div>
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
