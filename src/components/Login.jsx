import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [credentials, setCredentials] = useState({email: "", password: ""});
    const navigate = useNavigate();
    const host = 'https://taskly-backend.onrender.com';
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch (`${host}/api/auth/login`,{
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/todos");
          }
          else {
            alert("Invalid Credentials");
          }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };

  return (
    <div className="d-flex flex-column align-items-center login-container">
      <h1 className="text-center" style={{ marginTop: "50px" }}>
        Login
      </h1>
      <div className="login-form">
        <Container className="mt-4">
          <Form className="mt-4 container d-flex flex-column align-items-center" onSubmit={handleSubmit}>
            <Form.Group className="mb-3 container d-flex flex-column align-items-center" controlId="formBasicEmail">
              <Form.Label className="formlabel label1">Email address</Form.Label>
              <Form.Control className="formcontrol" type="email" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange}/>
            </Form.Group>

            <Form.Group className="mb-3 container d-flex flex-column align-items-center" controlId="formBasicPassword">
              <Form.Label className="formlabel">Password</Form.Label>
              <Form.Control className="formcontrol" type="password" placeholder="Password" name="password" value={credentials.password} onChange={onChange} />
            </Form.Group>
            <Button className="rounded-pill btn5 " variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default Login;
