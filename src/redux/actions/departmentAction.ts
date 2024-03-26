import { dispatch } from '../store.ts';
import departmentServices from '../../services/departmentServices.ts';
import {
  addDepartmentSuccess,
  deleteDepartmentSuccess,
  getDepartmentSuccess,
  setError,
  setLoading,
  updateDepartmentSuccess,
} from '../slices/departmentSlice.ts';
import { SetUpdatedataInterface } from '../../components/updateDepartmentModal/types.ts';

export const getDepartmentAction = async (page?: number, limit?: number): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await departmentServices.getDepartment(page, limit);
    dispatch(getDepartmentSuccess(responseData));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const addDepartmentAction = async (data: SetUpdatedataInterface, page: number, limit: number): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await departmentServices.addDepartment(data);
    dispatch(addDepartmentSuccess(responseData));
    getDepartmentAction(page, limit);
  } catch (error) {
    dispatch(setError(error));
  }
};

export const deleteDepartmentAction = async (id: string, page: number, limit: number): Promise<void> => {
  if (id === undefined) {
    console.error('id is undefined');
    return;
  }

  dispatch(setLoading(true));
  try {
    const responseData = await departmentServices.deleteDepartment(id);
    dispatch(deleteDepartmentSuccess(responseData));
    getDepartmentAction(page, limit);
  } catch (error) {
    dispatch(setError(error));
  }
};

export const updateDepartmentAction = async (
  id: string,
  data: SetUpdatedataInterface,
  page: number,
  limit: number
): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await departmentServices.updateDepartment(id, data);
    dispatch(updateDepartmentSuccess(responseData));
    getDepartmentAction(page, limit);
  } catch (error) {
    let departmentError;
    if (error.error.code === '23503') {
      departmentError = new Error('This department is already in use.');
    } else {
      departmentError = new Error('Something went wrong!');
    }
    dispatch(setError(departmentError));
  }
};
