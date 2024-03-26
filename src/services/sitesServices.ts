// utils
import axios from '../utils/axios.ts';
import { SitesInterface } from '../pages/sites/type.ts';

// ----------------------------- type --------------------------------------

const getSite = async (page?: number, limit?: number): Promise<void> => {
  let url = '/sites';
  if (page && limit) {
    url += `?page=${page}&limit=${limit}`;
  }
  const response = await axios.get(url);
  return response.data.data;
};

const addSite = async (data: SitesInterface): Promise<void> => {
  const response = await axios.post(`/sites/`, data);
  return response.data.data;
};

const editSite = async (id: string | undefined, data: SitesInterface): Promise<void> => {
  const response = await axios.put(`/sites/${id}`, data);
  return response.data.data;
};

const deleteSite = async (id: string): Promise<void> => {
  const response = await axios.delete(`/sites/${id}`);
  return response.data.data;
};

const sitesServices = {
  getSite,
  addSite,
  editSite,
  deleteSite,
};

export default sitesServices;
