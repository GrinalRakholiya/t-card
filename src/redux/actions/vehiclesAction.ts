import { dispatch } from '../store.ts';
import vehiclesServices from '../../services/vehiclesServices.ts';
import {
  deleteVehiclesSuccess,
  getVehiclesSucess,
  setError,
  setLoading,
  updateVehiclesSuccess,
} from '../slices/vehiclesSlice.ts';
import { SetUpdateVehicleInterface } from '../../components/updateVehicleModal/type.ts';
import { SetVehicleUpdateInterface } from '../../components/vehicleUpdateModel/types.ts';

export const getVehicleAction = async (page?: number, limit?: number): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await vehiclesServices.getVehicle(page, limit);
    dispatch(getVehiclesSucess(responseData));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const updateVehicleAction = async (
  qr: string,
  data: SetUpdateVehicleInterface | SetVehicleUpdateInterface,
  page?: number,
  limit?: number
): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await vehiclesServices.updateVehicle(qr, data);
    dispatch(updateVehiclesSuccess(responseData));
    getVehicleAction(page, limit);
  } catch (error) {
    dispatch(setError(error));
  }
};

export const deleteVehicleAction = async (id: string, page: number, limit: number): Promise<void> => {
  if (id === undefined) {
    const error = new Error('Something went wrong! please try again later');
    // console.error('id is undefined');
    throw error;
  }

  dispatch(setLoading(true));
  try {
    const responseData = await vehiclesServices.deleteVehicle(id);
    dispatch(deleteVehiclesSuccess(responseData));
    getVehicleAction(page, limit);
  } catch (error) {
    let vehicleError;
    if (error.error.code === '23503') {
      vehicleError = new Error('This vehicle is already in use.');
    } else {
      vehicleError = new Error('Something went wrong!');
    }
    dispatch(setError(vehicleError));
  }
};
