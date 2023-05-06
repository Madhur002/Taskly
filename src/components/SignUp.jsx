import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const host = "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/login");
    } else {
      alert("Invalid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex flex-column align-items-center login-container">
      <h1 className="text-center" style={{ marginTop: "50px" }}>
        Sign Up
      </h1>
      <div className="login-form" style={{ height: "450px" }}>
        <Container className="mt-4">
          <Form
            className="mt-4 container d-flex flex-column align-items-center"
            onSubmit={handleSubmit}
          >
            <Form.Group
              className="mb-3 container d-flex flex-column align-items-center"
              controlId="formBasicEmail"
            >
              <Form.Label className="formlabel label1 mt-1">Name</Form.Label>
              <Form.Control
                className="formcontrol mt-1"
                type="text"
                placeholder="Enter Your Name"
                name="name"
                value={credentials.name}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 container d-flex flex-column align-items-center"
              controlId="formBasicEmail"
            >
              <Form.Label className="formlabel label1 mt-1">
                Email address
              </Form.Label>
              <Form.Control
                className="formcontrol mt-1"
                type="email"
                placeholder="Enter Your email"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 container d-flex flex-column align-items-center"
              controlId="formBasicPassword"
            >
              <Form.Label className="formlabel mt-1">Password</Form.Label>
              <Form.Control
                className="formcontrol mt-1"
                type="password"
                placeholder="Password"
                name="password"
                minLength={5}
                required
                value={credentials.password}
                onChange={onChange}
              />
            </Form.Group>
            <Button
              className="rounded-pill btn5 "
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default SignUp;
