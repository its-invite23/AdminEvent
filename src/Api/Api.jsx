import axios from 'axios';
console.log("process.env.REACT_APP_URL",process.env.REACT_APP_URL)
const API_URL = process.env.REACT_APP_URL || "https://eventbackend-fyb5.onrender.com";

console.log("API_URL",API_URL)
function getToken() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('token');
    return data;
  }
  return null;
}



let Api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

Api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;
