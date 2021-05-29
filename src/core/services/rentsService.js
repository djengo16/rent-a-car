import axios from "axios";
import { calculateDays } from "./dateService";

const url = 'http://localhost:3000/';

export const RentalStatus = {
  Waiting: "Waiting",
  InProccess: "In Proccess",
  Old: "Old",
};

export const QueryRentalStatus = {
  waiting: "Waiting",
  'in-proccess': "In Proccess",
  old: "Old",
};


/**
 * This function calculates the total price with or within discount
 * by several rules: if the customer has rented more than 3
 * times in the last 2 months he is designated as VIP customer and
 *  gets 15% discount, if the rental period is more than
 * 3 days -> 5%
 * 5 days -> 7%
 * 10 days -> 10%
 * @param {*} param => to, from, customer, pricePerDay
 * @returns object => {price, total, discountPercent}
 */
export function calculateTotalPrice({ to, from, customer, pricePerDay }) {
  let discountPercent = 0;
  let price = 0;
  let total = 0;

  let totalDays = calculateDays(from, to);

  if (customer.isVip) {
    discountPercent = 15;
  } else if (totalDays > 10) {
    discountPercent = 10;
  } else if (totalDays > 5) {
    discountPercent = 7;
  } else if (totalDays > 3) {
    discountPercent = 5;
  }

  price = Math.max(0, totalDays * parseInt(pricePerDay));
  total = Math.max(0, price - price * (discountPercent / 100));

  return { price, total, discountPercent };
}

export function createRental(rental) {
  return axios.post(`${url}rentalEvents`, rental);
}

export function getCustomerRentals(customerId){
  return axios.get(`${url}rentalEvents/?customerId=${customerId}`)
}

export function getAllRentals(){
  return axios.get(`${url}rentalEvents`)
}