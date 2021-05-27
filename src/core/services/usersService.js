import axios from 'axios'

const url = 'http://localhost:3000/';

export function getAllUsers(){
   return axios.get(`${url}users`);
}

export function getUserById(id){
   return axios.get(`${url}users/${id}`)
}

export function updateUser(user){
   return axios.put(`${url}users/${user.id}`, user);
}

export function deleteUser(userId){
  return axios.delete(`${url}users/${userId}`)
}