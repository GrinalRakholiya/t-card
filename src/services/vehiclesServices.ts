// utils
import { SetUpdateVehicleInterface } from '../components/updateVehicleModal/type.ts';
import { SetVehicleUpdateInterface } from '../components/vehicleUpdateModel/types.ts';
import axios from '../utils/axios.ts';

// ----------------------------- type --------------------------------------

const getVehicle = async (page?: number, limit?: number): Promise<void> => {
  let url = '/vehicles';
  if (page && limit) {
    url += `?page=${page}&limit=${limit}`;
  }
  const response = await axios.get(url);
  return response.data.data;
};

const updateVehicle = async (
  qr: string,
  data: SetUpdateVehicleInterface | SetVehicleUpdateInterface
): Promise<void> => {
  console.log(qr, data, 'update vehicle');
  const response = await axios.put(`/vehicles/${qr}`, data);
  return response.data.data;
};

const deleteVehicle = async (id: string): Promise<void> => {
  const response = await axios.delete(`/vehicles/${id}`);
  return response.data.data;
};

const vehiclesServices = {
  getVehicle,
  updateVehicle,
  deleteVehicle,
};

export default vehiclesServices;
