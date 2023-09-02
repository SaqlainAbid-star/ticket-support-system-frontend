import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/authSlice";

export default function MenuBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = JSON.parse(localStorage.getItem("userDetails"));
  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      className="bg-body-tertiary py-3"
    >
      <Container>
        <Navbar.Brand href="/dashboard" className="fw-bold">
          {loggedInUser?.user?.name}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav>
              <Link
                to="/"
                className="text-decoration-none text-dark fw-semibold px-2"
              >
                Dashboard
              </Link>
            </Nav>
            
            {loggedInUser?.user?.userType === "Admin" ? (
            <Nav>
              <Link
                to="/clients"
                className="text-decoration-none text-dark fw-semibold px-2"
              >
                Clients
              </Link>
            </Nav>
            ) : (
              null
            )}

            {loggedInUser?.user?.userType === "Admin" ? (
              <Nav>
                <Link
                  to="/tickets"
                  className="text-decoration-none text-dark fw-semibold px-2"
                >
                  Tickets
                </Link>
              </Nav>
            ) : (
              <>
                <Nav>
                  <Link
                    to="/mytickets"
                    className="text-decoration-none text-dark fw-semibold px-2"
                  >
                    My Tickets
                  </Link>
                </Nav>
              </>
            )}
            <Nav className="px-2">
              <Button
                className="bg-light border-0 text-dark fw-semibold fs-6 p-0"
                size="sm"
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
