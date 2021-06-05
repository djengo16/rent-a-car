import axios from "axios";
import { isDateInTheLast } from "./dateService";
import { getCustomerRentals } from "./rentsService";

const url = "http://localhost:3000/";

export function getAllUsers() {
  return axios.get(`${url}users`);
}

export function getUserById(id) {
  return axios.get(`${url}users/${id}`);
}

export async function updateUser(user) {
  const users = (await getAllUsers()).data;

  if (users.find((u) => u.email === user.email && u.id !== user.id)) {
    throw new Error("Email already exists.");
  }
  Object.values(user).forEach(x => {
    if(x === "" || x === undefined || x === null){
      throw new Error("All fields are required!");
    }
  })

  localStorage.setItem("loggedUser", JSON.stringify(user));
  return axios.put(`${url}users/${user.id}`, user);
}

export function deleteUser(userId) {
  return axios.delete(`${url}users/${userId}`);
}

export async function shouldUpdateToVIP(customer) {
  const days = 60;
  if (customer.isVip) {
    return false;
  }

  const customerRentals = (await getCustomerRentals(customer.id)).data;

  let rentalsInLastTwoMonths = 0;
  customerRentals.forEach((x) => {
    if (isDateInTheLast(new Date(x.startDate), days)) {
      rentalsInLastTwoMonths += 1;
    }
  });

  return rentalsInLastTwoMonths === 3;
}
