import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    userType: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((values) => ({ ...values, [name]: value }));
  };

  const { name, email, phoneNumber, password } = loginData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phoneNumber || !password) {
      alert("Please enter all the fields");
    } else {
      try {
        const res = await fetch("https://ticket-support-system-backend-4u1x.vercel.app/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
        const response = await res.json();
        console.log("Registe resp >> ", response);
        alert(response.status);
      } catch (error) {
        console.log("Register error >> ", error);
      }
      setLoginData({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        userType: ""
      });
      navigate("/");
    }

    // dispatch(createUser(loginData))
    //   .unwrap()
    //   .then((res) => {
    //     console.log("Registe resp >> ",res);
    //     alert(res.status);
    //   })
    //   .catch((err) => console.log("Register error >> ", err));
    //   setLoginData({
    //     name: "",
    //     email: "",
    //     phoneNumber: "",
    //     password: "",
    //     userType: ""
    //   });
    //   navigate("/");
    // }
    

  };
  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <Container className="loginPage p-5 rounded">
        <Form onSubmit={handleSubmit}>
          <h4 className="text-center mb-4 fw-bold">Register</h4>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Select aria-label="Default select example"
              name="userType"
              value={loginData.userType}
              onChange={handleChange}
              >
              <option>Select User Type</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={loginData.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="py-2"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="py-2"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={loginData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="py-2"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              className="py-2"
            />
          </Form.Group>
          <p className="text-muted link text-end">
            Already Have an account?
            <Link to={"/"} className="ms-1">
              Login
            </Link>
          </p>
          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Container>
    </Container>
  );
}
