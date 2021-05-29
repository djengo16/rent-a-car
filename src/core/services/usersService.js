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

export function updateUser(user) {
  return axios.put(`${url}users/${user.id}`, user);
}

export function updateUserRentals(rental, userId) {
  return axios.put(`${url}users/${userId}`, rental);
}

export function deleteUser(userId) {
  return axios.delete(`${url}users/${userId}`);
}

export async function shouldUpdateToVIP(customer) {
  const days = 60;
  if (customer.isVip || !customer.rentals) {
    return false;
  }

  const customerRentals = (await getCustomerRentals(customer.id)).data;

  let rentalsInLastTwoMonths = 0;
  customerRentals.forEach((x) => {
    if (isDateInTheLast(x.startDate, days)) {
      rentalsInLastTwoMonths += 1;
    }
  });

  return rentalsInLastTwoMonths === 3;
}
