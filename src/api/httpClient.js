import axios from 'axios';

const basicToken = `Basic ${btoa(`${process.env.VUE_APP_RANDOM_HASH}:${process.env.VUE_APP_RANDOM_HASH_ADMIN}`)}`;
const authToken = localStorage.getItem('token')
  ? `Bearer ${localStorage.getItem('token')}`
  : basicToken;

const httpClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Factory-Application-Id': process.env.VUE_APP_APPLICATION_ID,
    Authorization: authToken,
  },
});

export const setToken = (token) => {
  console.log(token);
  httpClient.defaults.headers.Authorization = `Bearer ${token}`;
};

export const deleteToken = () => {
  httpClient.defaults.headers.Authorization = basicToken;
};

export default httpClient;
