import axios from 'axios'

const url = 'http://localhost:3000/';

export function getAllUsers(){
   return axios.get(`${url}users`);
}

export function getUserById(id){
   return axios.get(`${url}users/${id}`)
}