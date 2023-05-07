import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Link, useLocation } from "react-router-dom";

const NavbarComponent = () => {
  // Set up the headers for the API request
  const headers = {
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("token"),
  };
  const nameInNavbar = document.getElementById("nameInNavbar");

  // Make the API request and extract the name from the response
  fetch("https://taskly-backend.onrender.com/api/auth/getuser", {
    method: "POST",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      const nameOfPerson = data.name;
      nameInNavbar.textContent = nameOfPerson;
    });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  let location = useLocation();

  return (
    <>
      <Navbar variant="dark" expand="lg" className="navbar-light">
        <Container fluid>
          <Navbar.Brand
            href="/"
            style={{
              letterSpacing: "5px",
              fontWeight: "500",
              marginLeft: "8px",
            }}
          >
            TASKLY <i className="bi bi-app-indicator"></i>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            className={`${
              isMenuOpen ? "rotatemenu border-0 navMenu" : "border-0 navMenu"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "160px" }}
              navbarScroll
            >
              <Nav className="me-auto">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className={`nav-link ${
                    location.pathname === "/todos" ? "active" : ""
                  }`}
                  to="/todos"
                >
                  Todos
                </Link>
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </Nav>
            </Nav>
            {!localStorage.getItem("token") ? (
              <Form className="d-flex">
                <Link
                  className="rounded-pill mx-1 btn3"
                  variant="dark"
                  size="sm"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="rounded-pill mx-1 btn4"
                  variant="dark"
                  size="sm"
                  to="/signup"
                  role="button"
                >
                  Sign Up
                </Link>
              </Form>
            ) : (
              <Link
                onClick={handleLogout}
                className="rounded-pill mx-1 btn4"
                variant="dark"
                size="sm"
                to="/login"
                role="button"
              >
                Logout
              </Link>
            )}
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                marginLeft: "8px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
              id="nameInNavbar"
            ></Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
