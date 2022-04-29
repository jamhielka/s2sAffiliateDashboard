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