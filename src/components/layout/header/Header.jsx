import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { Navbar, Nav, Image, NavDropdown } from "react-bootstrap";
import {useContext} from 'react'
import UserContext from "../../../Context";

export const Header = () => {

  const context = useContext(UserContext);


  const onLogout = () => {
    context.logOut();
  };

    return (
      context.user.loggedIn ? (
      <header>
        <Navbar className={styles["navigation"]} bg="light" expand="lg">
          <Navbar.Brand>
            <Link to="/home">
            <Image src="https://i.ibb.co/LgnR14V/car.png" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </Nav>
              <Nav className="ms-auto">
                {context.user.isAdmin === true && 
              <NavDropdown title="Admin" drop="left" id="collasible-nav-dropdown">
                 <NavDropdown.Item>
                     <Link className="nav-link" to="/cusotmer/create">
                       Create customer
                     </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                     <Link className="nav-link" to="/ad/create">
                       Create ad
                     </Link>
                  </NavDropdown.Item>
              </NavDropdown> }
                <Link className="nav-link" to="/" onClick={onLogout}>
                  Logout
                </Link>
              </Nav>
          </Navbar.Collapse>
        </Navbar>
        </header>
        ) : (
          <header>
          <Navbar className={styles["navigation"]} bg="light" expand="lg">
          <Navbar.Brand>
            <Link to="/home">
            <Image src="https://i.ibb.co/LgnR14V/car.png" />
            </Link>
          </Navbar.Brand>
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