import { Component } from "react";
import styles from "./register.module.css";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../../core/services/authService";
import Sider from "../../sider/Sider";
import { Spinner, Form} from 'react-bootstrap'

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      isAdmin: false,
      phone: "",
      password: "",
      confirmPassword: "",
      redirect: false,
      error: "",
      isLoading: false,
      isAdmin: false,
      rentals: [],
      avatar: "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png",
    };
  }

  onInputChange = (event) => {
    event.persist();

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    this.setState({isLoading: true});
    const { redirect, error, confirmPassword, isLoading, ...user } = this.state;
    if (user.password !== confirmPassword) {
      this.setState({ error: "Passwords do not match!" });
    }

    register(user)
      .then((_) => {
        this.setState({
          redirect: true,
          isLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
          isLoading: false,
        })
      });
  };

  render() {
    return (
      <>
        <Sider />
        {this.state.redirect === true && <Redirect to="/login" />}
        <div className={styles["register-form-wrapper"]}>
          <Form
            className={styles["register-form"]}
            onSubmit={this.onFormSubmit}
          >
            <h2>Register</h2>
            {this.state.error && (
              <span className="text-danger">{this.state.error}</span>
            )}
            <div className="form-grup">
              <label htmlFor="fullName">Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-control border-dark"
                onChange={this.onInputChange}
                required
              />
            </div>
            <div className="form-grup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control border-dark"
                onChange={this.onInputChange}
                required
              />
            </div>
            <div className="form-grup">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="form-control border-dark"
                onChange={this.onInputChange}
                required
              />
            </div>
            <div className="form-grup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control border-dark"
                onChange={this.onInputChange}
                required
              />
            </div>
            <div className="form-grup">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control border-dark"
                onChange={this.onInputChange}
                required
              />
            </div>
            {this.state.isLoading ? (
              <Spinner animation="border" role="status">
              <span className="sr-only" />
            </Spinner>
            ) : (
              <button className="btn btn-dark">Sign Up</button>
            )}
            <div>
              <small>
                Already have an account?{" "}
                <Link className={styles["login-redirect"]} to="/login">
                  Sign In!
                </Link>
              </small>
            </div>
          </Form>
        </div>
      </>
    );
  }
}
