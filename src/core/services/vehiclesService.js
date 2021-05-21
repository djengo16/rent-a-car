import axios from 'axios'

const url = "http://localhost:3000/";

export function getVehicles(){
    return axios.get(url + 'vehicles');
}

export function getVehicleBrands(){
    return axios.get(url + 'vehicleBrands');
}
/**
 * 
 * @param {*} adInfo => car details, brand, model,construction year etc.
 * @returns 
 */
export function createVehicleAd(adInfo){

    if(Object.keys(adInfo).length !== 9){
        throw new Error('All fields are required!')
    }

    return axios.post(url + 'vehicles', adInfo);
}