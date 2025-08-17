import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Your backend base URL
  withCredentials: true, //  always send cookies
});

export default API;
