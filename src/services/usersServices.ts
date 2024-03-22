// utils
import { AddUserInterface } from '../pages/users/types.ts';
import axios from '../utils/axios.ts';

// ----------------------------- type --------------------------------------

interface UserInterface {
  id: number;
  user_name: string;
  password: string;
  name: string;
  role_id: string;
  phone_number: string;
  email: string;
  assigned_site: string;
  assigned_department: string;
  created_at: number;
  updated_at: number;
}

export interface ResetPassInterface {
  user_name?: string;
  new_password?: string;
}

const getUsers = async (page: number, limit: number): Promise<void> => {
  let url = '/users';
  if (page && limit) {
    url += `?page=${page}&limit=${limit}`;
  }
  const response = await axios.get(url);
  return response.data.data;
};

const addUser = async (data: AddUserInterface): Promise<void> => {
  const response = await axios.post(`/users/`, data);
  return response.data.data;
};

const editUser = async (data: UserInterface): Promise<void> => {
  const response = await axios.put(`/users/${data.id}`, data);
  return response.data.data;
};

const deleteUser = async (id: number): Promise<void> => {
  const response = await axios.delete(`/users/${id}`);
  return response.data.data;
};

const resetUserPassword = async (data: ResetPassInterface): Promise<void> => {
  const response = await axios.post(`/auth/reset`, data);
  return response.data.data;
};

const usersServices = {
  getUsers,
  addUser,
  editUser,
  deleteUser,
  resetUserPassword,
};

export default usersServices;
