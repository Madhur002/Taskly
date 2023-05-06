import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from 'react-bootstrap/Form';
import { Link, useLocation } from "react-router-dom";

const NavbarComponent = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
  }
  let location = useLocation();

  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
      <Navbar.Brand href="/" style={{letterSpacing: "5px", fontWeight: "500", marginLeft: "8px"}} >TASKY <i className="bi bi-app-indicator"></i></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '160px' }}
            navbarScroll
          >
          <Nav className="me-auto">
            <Link className={`nav-link ${location.pathname=== "/" ? "active" : ""}`} to="/">
              Home
            </Link>
            <Link className={`nav-link ${location.pathname=== "/todos" ? "active" : ""}`} to="/todos">
              Todos
            </Link>
            <Link className={`nav-link ${location.pathname=== "/about" ? "active" : ""}`} to="/about">
              About
            </Link>
          </Nav>
          </Nav>
          {!localStorage.getItem('token') ?
          <Form className="d-flex">
          <Link  className="rounded-pill mx-1 btn3" variant="dark" size="sm" to="/login" role="button">Login</Link>
          <Link  className="rounded-pill mx-1 btn4" variant="dark" size="sm" to="/signup" role="button">Sign Up</Link>
          </Form> : <Link onClick={handleLogout} className="rounded-pill mx-1 btn4" variant="dark" size="sm" to="/login" role="button">Logout</Link>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default NavbarComponent;
