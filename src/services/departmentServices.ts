// utils

import { SetUpdatedataInterface } from '../components/updateDepartmentModal/types.ts';
import axios from '../utils/axios.ts';

// ----------------------------- type --------------------------------------

const getDepartment = async (page?: number, limit?: number): Promise<void> => {
  let url = '/departments';
  if (page && limit) {
    url += `?page=${page}&limit=${limit}`;
  }
  const response = await axios.get(url);
  return response.data.data;
};

const addDepartment = async (data: SetUpdatedataInterface): Promise<void> => {
  const response = await axios.post(`/departments/`, data);
  return response.data.data;
};

const deleteDepartment = async (id: string): Promise<void> => {
  const response = await axios.delete(`/departments/${id}`);
  return response.data.data;
};

const updateDepartment = async (id: string, data: SetUpdatedataInterface): Promise<void> => {
  const response = await axios.put(`/departments/${id}`, data);
  return response.data.data;
};

const departmentServices = {
  getDepartment,
  addDepartment,
  deleteDepartment,
  updateDepartment,
};

export default departmentServices;
