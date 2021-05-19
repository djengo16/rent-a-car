import axios from 'axios'

const url = "http://localhost:3000/";

export function getVehicles(){
    return axios.get(url + 'vehicles');
}