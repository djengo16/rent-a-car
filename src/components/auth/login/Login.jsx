import { useState } from "react";
import styles from "./login.module.css";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../../core/services/authService";
import Sider from "../../sider/Sider";
import {Spinner} from 'react-bootstrap';

export function Login() {
  const [userData, setUserData] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onInputChange = (event) => {
    event.persist();

    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    login(userData)
      .then((_) => {
        setLoading(false);
        setRedirect(true);
        window.location.reload();
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false);
      });
  };

  return (
    <>
      <Sider></Sider>
      {redirect && <Redirect to="/" />}
      <div className={styles["login-form-wrapper"]}>
        <form className={styles["login-form"]} onSubmit={onFormSubmit}>
          <h2>Login</h2>
          {error && <span className="text-danger">{error}</span>}
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control border-dark"
              onChange={onInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control border-dark"
              onChange={onInputChange}
              required
            />
          </div>
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only" />
            </Spinner>
          ) : (
            <button className="btn btn-dark">Login</button>
          )}
          <div>
            <small>
              Dont have an account yet?{" "}
              <Link className={styles["register-redirect"]} to="/register">
                Sign Up!
              </Link>
            </small>
          </div>
        </form>
      </div>
      //{" "}
    </>
  );
}
