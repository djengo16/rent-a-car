import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { Navbar, Nav } from "react-bootstrap";
import { getLoggedUser, logout } from "../../../core/services/authService";
import { useEffect } from "react";

export function Header() {
  const isUserLogged = getLoggedUser() !== null;

  const onLogout = () => {
    logout();
  };

  useEffect(()=> {
    fetch('http://localhost:3001/')
}, [isUserLogged]);

  return (
    isUserLogged ? (
    <header>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/home"> Rent a Car</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav>
            <Nav className="ms-auto">
              <Link className="nav-link" to="/" onClick={onLogout}>
                Logout
              </Link>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
      </header>
      ) : (
        <header>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/home"> Rent a Car</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav>
            <Nav className="ms-auto">
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
      </header>
      )
  );
}
