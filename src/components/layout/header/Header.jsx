import { Link, NavLink } from "react-router-dom";
import styles from "./header.module.css";
import { Navbar, Nav, Image, NavDropdown, Badge } from "react-bootstrap";
import {useContext} from 'react'
import UserContext from "../../../Context";

export const Header = () => {

  const context = useContext(UserContext);


  const onLogout = () => {
    context.logOut();
  };

    return (
      context.user.loggedIn ? (
      <header id={styles["header"]}>
        <Navbar className={styles["navigation"]} bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/offers">
                Offers
              </Link>
            </Nav>
              <Nav className="ms-auto">
              <Nav className="mr-auto">
              <Link className="nav-link" to={`/user/${context.user.id}`}>
                Profile
              </Link>
            </Nav>
            <Badge variant="danger">8</Badge>
                {context.user.isAdmin === true && 
              <NavDropdown title="Admin" drop="left" id="collasible-nav-dropdown">
                 <NavDropdown.Item>
                     <NavLink className="nav-link" to="/users">
                       View customers
                     </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                     <NavLink className="nav-link" to="/ad/create">
                       Create ad
                     </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                     <NavLink className="nav-link" to="/rentals">
                       Rentals
                     </NavLink>
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
              <Link className="nav-link" to="/offers">
                Offers
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