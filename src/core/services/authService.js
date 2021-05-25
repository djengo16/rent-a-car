import { getAllUsers } from "./usersService";
import axios from 'axios'


const url = 'http://localhost:3000/';

/**
 *
 * @param userData  => {username, password}
 */
export async function login(userData) {
  const users = (await getAllUsers()).data;

  const loggedUser = users.find(
    (user) =>
      user.email === userData.email &&
      user.password.toString() === userData.password
  );

  if (loggedUser) {
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    return loggedUser;
  }

  throw new Error("Invalid username/password");
}

/**
 *
 * @param => {email, password, confirmPassword, name, phone}
 */
export async function register(userData) {
  const users = (await getAllUsers()).data;

  if (users.find((u) => u.email === userData.email)) {
    throw new Error("Email already exists");
  }

  userData = {
    ...userData,
    isAdmin: false
  };

  return axios.post(url + 'users', userData);
}

export function logout(){
  localStorage.removeItem('loggedUser');
}

/**
 * @returns the logged user or undefined
 */
export function getLoggedUser() {
  return JSON.parse(localStorage.getItem("loggedUser"));
}