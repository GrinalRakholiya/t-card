import { AxiosResponse } from 'axios';
// utils
import axios from '../utils/axios.ts';
// type
import { UserDataType } from '../types/UserTypes.ts';

// -------------------------------------------------------------------

const login = async (username: string, password: string): Promise<UserDataType> => {
  const response: AxiosResponse = await axios.post('/auth/admin', {
    user_name: username,
    password,
  });
  return response.data.data;
};

const refreshToken = async (): Promise<UserDataType> => {
  const response: AxiosResponse = await axios.get('/auth');
  return response.data.data;
};

const AuthService = {
  login,
  refreshToken,
};

export default AuthService;
