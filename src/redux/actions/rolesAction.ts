import { getRolesSuccess, addRolesSuccess, setError, setLoading, deleteRolesSuccess } from '../slices/rolesSlice.ts';
import { dispatch } from '../store.ts';
import rolesServices, { AddRolePropType } from '../../services/rolesServices.ts';

export const getRolesAction = async (page?: number, limit?: number): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const data = await rolesServices.getRoles(page, limit);
    dispatch(getRolesSuccess(data));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const addRolesAction = async (data: AddRolePropType, page: number, limit: number): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await rolesServices.addRoles(data);
    dispatch(addRolesSuccess(responseData));
    getRolesAction(page, limit);
  } catch (error) {
    dispatch(setError(error));
  }
};

export const deleteRolesAction = async (id: string, page: number, limit: number): Promise<void> => {
  if (id === undefined) {
    console.error('id is undefined');
    return;
  }

  dispatch(setLoading(true));
  try {
    const responseData = await rolesServices.deleteRoles(id);
    dispatch(deleteRolesSuccess(responseData));
    getRolesAction(page, limit);
  } catch (error) {
    let roleError;
    if (error.error.code === '23503') {
      roleError = new Error('This role is already in use.');
    } else {
      roleError = new Error('Something went wrong!');
    }
    dispatch(setError(roleError));
  }
};
