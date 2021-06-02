import axios from "axios";

const url = "http://localhost:3000/";

export function getVehicles() {
  return axios.get(url + "vehicles");
}

export function getVehicleBrands() {
  return axios.get(url + "vehicleBrands");
}
/**
 *
 * @param {*} adInfo => car details, brand, model,construction year etc.
 * @returns
 */
export function createVehicleAd(adInfo) {
  if (Object.keys(adInfo).length !== 9) {
    throw new Error("All fields are required!");
  }

  return axios.post(url + "vehicles", adInfo);
}

export function updateVehicleAd(updatedVehicleAd) {
  return axios.put(`${url}vehicles/${updatedVehicleAd.id}`, updatedVehicleAd);
}
/**
 *
 * @param {*} id
 * @returns vehicle details
 */
export function getVehicleAd(id) {
  return axios.get(`${url}vehicles/${id}`);
}

export function deleteVehicleAd(id) {
  return axios.delete(`${url}vehicles/${id}`);
}

export function increaseVehiclesCount(id) {
  getVehicleAd(id).then((res) => {
    let { availableCount, ...other } = res.data;
    availableCount += 1;

    return axios.put(`${url}vehicles/${id}`, { ...other, availableCount });
  });

  return false;
}
