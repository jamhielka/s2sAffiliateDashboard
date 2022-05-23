import axios from 'axios';

const _username = 's2sAff001'
const _password = 'XSxFE@AtQv#'
export const API = axios.create({
  baseURL: `http://161.49.63.45:9095/api`,
  headers: {
    'Content-Type': 'application/json',
  },
 auth: {
    username: _username,
   password: _password
 }
});

export const LOCATION_API = axios.create({
  baseURL: "http://52.220.32.14:10210/api",
  headers: {
    "Content-Type": "application/json",
  },
});

