import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { handleSignOut } from "../Login/loginManager";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/logos/logo.png";
import "./Header.css";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import "firebase/auth";
import * as firebase from "firebase/app";
import firebaseConfig from '../Login/firebase.config';

const Header = () => {
  // Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  //Signout Method
  const logout = () => {
    handleSignOut().then(() => setLoggedInUser(""));
    history.replace('/');
  };

  useEffect(() => {
    fetch("https://young-sierra-54115.herokuapp.com/isAdmin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: loggedInUser && loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => setIsAdmin(data));
  }, []);

  return (
    <Navbar expand="lg">
      <Link className="navbar-brand" to="/">
        {/* <Image src={require("../../assets/logos/logo.png")} id="logo" /> */}
        <img src={logo} alt=""/>
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {location.pathname === "/" ? (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Nav.Link href="#partners">Our Partners</Nav.Link>
            <Nav.Link href="#link">Our Team</Nav.Link>
            <Nav.Link href="#footer">Contact Us</Nav.Link>

            {loggedInUser && loggedInUser.email ? (
              <>
                <Button variant="dark" id="login-btn" onClick={logout}>
                  Logout
                </Button>
                <Link
                  className="nav-link text-white"
                  to={isAdmin ? "/service-list-admin" : "/order"}
                >
                  <Button id="dash-btn" variant="dark">
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <Link className="nav-link text-white" to="/login">
                <Button variant="dark" id="login-btn">
                  Login
                </Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      ) : (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {loggedInUser && loggedInUser.email ? (
              <>
                <p style={{ marginRight: "50px", marginTop: "20px" }}>
                  {" "}
                  {loggedInUser.name}
                </p>
                <Button
                  className="nav-link text-white"
                  variant="dark"
                  id="login-btn"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link className="nav-link text-white" to="/login">
                <Button variant="dark" id="login-btn">
                  Login
                </Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default Header;
