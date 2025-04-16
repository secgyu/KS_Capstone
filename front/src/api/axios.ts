import axios from 'axios';

// http://192.168.0.8:3030
const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
});

export default axiosInstance;