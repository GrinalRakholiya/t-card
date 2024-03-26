// utils

import axios from '../utils/axios.ts';

// ----------------------------- type --------------------------------------

export type AddRolePropType = {
  role: string;
};

// --------------------------------------------------------------------------------------

const getRoles = async (page?: number, limit?: number): Promise<void> => {
  let url = '/roles';
  if (page && limit) {
    url += `?page=${page}&limit=${limit}`;
  }
  const response = await axios.get(url);
  return response.data.data;
};

const addRoles = async (data: AddRolePropType): Promise<void> => {
  const response = await axios.post(`/roles/`, data);
  return response.data.data;
};

const deleteRoles = async (id: string): Promise<void> => {
  const response = await axios.delete(`/roles/${id}`);
  return response.data.data;
};

const rolesServices = {
  getRoles,
  addRoles,
  deleteRoles,
};

export default rolesServices;
