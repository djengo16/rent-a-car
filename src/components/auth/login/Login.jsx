import { useContext, useState } from "react";
import styles from "./login.module.css";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../../core/services/authService";
import Sider from "../../sider/Sider";
import {Spinner, Alert} from 'react-bootstrap';
import UserContext from "../../../Context";

export function Login() {
  const [userData, setUserData] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const context = useContext(UserContext);

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
      .then((user) => {
        context.logIn(user)
        setLoading(false);
        setRedirect(true);
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
          <h2 className={styles["login-heading"]}>Login</h2>
          {error && <Alert variant="danger" >{error}</Alert>}
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
    </>
  );
}
