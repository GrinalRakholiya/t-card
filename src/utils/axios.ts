import axios from 'axios';
import { getToken } from './localStorageHelper.ts';
// config
import { HOST_API } from '../config.ts';
import { logoutAction } from '../redux/actions/authActions.ts';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

console.log('instace', HOST_API);

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      logoutAction();
      return Promise.reject();
    }
    return Promise.reject((error.response && error.response.data) || new Error('Something went wrong'));
  }
);

export default axiosInstance;
