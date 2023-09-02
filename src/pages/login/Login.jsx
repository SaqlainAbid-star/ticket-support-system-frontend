import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUser, signinUser } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";



export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      alert("Please fill all the fields");
    } else {
      
    //   try {
    //     const res = await fetch("http://localhost:3001/api/login", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(loginData),
    //     });
    //     const response = await res.json();
    //     console.log("Login resp >> ", response);
    //     localStorage.setItem("userDetails", JSON.stringify(response.data));
    //     dispatch(setUser(response));
    //     setLoginData({
    //       email: "",
    //       password: "",
    //     });
    //     navigate("/");
    //     // alert(response.status);
    //   } catch (error) {
    //     console.log("Login error >> ", error);
    //   }
    // }


    dispatch(signinUser(loginData))
      .unwrap()
      .then((res) => {
        console.log("Login resp >> ",res.data);
        localStorage.setItem("userDetails", JSON.stringify(res.data));
        dispatch(setUser(res.data.user));
        setLoginData({
          email: "",
          password: "",
        });
        navigate("/");
      })
      .catch((err) => console.log("Login error >> ", err));
    }

  };
  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <Container className="loginPage p-5 rounded">
        <Form onSubmit={handleSubmit}>
          <h4 className="text-center mb-4 fw-bold">Login To Your Account</h4>
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
            {/* <Form.Text className="text-muted">Incorrect email</Form.Text> */}
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
            {/* <Form.Text className="text-muted">Incorrect password</Form.Text> */}
          </Form.Group>
          <p className="text-muted link text-end">
            Don't Have an account?
            <Link to={"/register"} className="ms-1">
              Register
            </Link>
          </p>
          <Button variant="primary" type="submit" className="w-100 mb-2">
            Login
          </Button>
        </Form>
      </Container>
    </Container>
  );
}
