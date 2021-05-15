import { Component } from "react";
import styles from "./register.module.css";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../../core/services/authService";

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
      redirect: "false",
      error: "",
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

    const { redirect, error, confirmPassword, ...user } = this.state;

    if (user.password !== confirmPassword) {
      throw new Error("Passwords do not match!");
    }

    register(user)
      .then((_) => {
        this.setState({
          redirect: true,
        });
      })
      .catch((err) => ({ error: err.message }));
  };

  render() {
    return (
      <>
        {this.state.redirect === true && <Redirect to="/login" />}
        <div className={styles["register-form-wrapper"]}>
          <form
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
                onChange={this.onInputChange}
                required
              />
            </div>
            <div className="form-grup">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="confirmPassword"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                onChange={this.onInputChange}
                required
              />
            </div>
            <button className="btn btn-primary">Login</button>
            <div>
              <Link to="/register">Already have an account?</Link>
            </div>
          </form>
        </div>
      </>
    );
  }
}
