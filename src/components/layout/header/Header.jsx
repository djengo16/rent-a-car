import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { Navbar, Nav, Image, NavDropdown } from "react-bootstrap";
import { getLoggedUser, logout } from "../../../core/services/authService";
import {Component} from 'react'

export class Header extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: () => getLoggedUser()
    }
  }

  onLogout = () => {
    logout();
    this.forceUpdate()
  };

  componentDidMount(){
    console.log(this.state.user());
  }

  render(){
    return (
      this.state.user() !== null ? (
      <header>
        <Navbar className={styles["navigation"]} bg="light" expand="lg">
          <Navbar.Brand href="/home">
            <Image src="https://i.ibb.co/LgnR14V/car.png" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </Nav>
              <Nav className="ms-auto">
                {this.state.user().isAdmin === true && 
              <NavDropdown title="Admin" drop="left" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Create customer</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Create ad</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              }
                <Link className="nav-link" to="/" onClick={this.onLogout}>
                  Logout
                </Link>
              </Nav>
          </Navbar.Collapse>
        </Navbar>
        </header>
        ) : (
          <header>
          <Navbar className={styles["navigation"]} bg="light" expand="lg">
          <Navbar.Brand href="/home">
            <Image src="https://i.ibb.co/LgnR14V/car.png" />
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
}