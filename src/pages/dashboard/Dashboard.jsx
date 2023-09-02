import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


export default function Dashboard() {
  const loggedInUser = JSON.parse(localStorage.getItem("userDetails"));

  const dispatch = useDispatch();

  // state becomes empty on reload
  // const { user } = useSelector((state) => state.auth);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);



  const navigate = useNavigate();
  const checkIsLoggedIn = () => {
    if (loggedInUser) {
      navigate("/");
    } else if (!loggedInUser) {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkIsLoggedIn();
  }, []);
  return (
    <Container
      fluid
      className="min-vh-100 py-5 d-flex align-items-center justify-content-center"
    >
      <Container className="userDetailsBox">
        <p className="fw-bold fs-5">
          Logged in as:
          <span className="fw-normal ms-1">{loggedInUser?.user?.userType}</span>
        </p>
        <p className="fw-bold fs-5">
          Email:
          <span className="fw-normal ms-1">{loggedInUser?.user?.email}</span>
        </p>
        <p className="fw-bold fs-5">
          Phone Number:{" "}
          <span className="fw-normal ms-1">
            {loggedInUser?.user?.phoneNumber}
          </span>
        </p>
      </Container>
    </Container>
  );
}
