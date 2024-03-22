import { dispatch } from '../store.ts';
import {
  addUsersSucess,
  deleteUsersSuccess,
  editUsersSuccess,
  getUsersSucess,
  resetUserSuccess,
  setError,
  setLoading,
} from '../slices/usersSlice.ts';
import usersServices, { ResetPassInterface } from '../../services/usersServices.ts';
import { AddUserInterface, UserInterface } from '../../pages/users/types.ts';

export const getUsersAction = async (page: number, limit: number): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await usersServices.getUsers(page, limit);
    dispatch(getUsersSucess(responseData));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const addUserAction = async (data: AddUserInterface, page: number, limit: number): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await usersServices.addUser(data);
    dispatch(addUsersSucess(responseData));
    getUsersAction(page, limit);
  } catch (error) {
    dispatch(setError(error));
  }
};

export const editUserAction = async (data: UserInterface, page: number, limit: number): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await usersServices.editUser(data);
    dispatch(editUsersSuccess(responseData));
    getUsersAction(page, limit);
  } catch (error) {
    dispatch(setError(error));
  }
};

export const deleteUserAction = async (id: number, page: number, limit: number): Promise<void> => {
  if (id === undefined) {
    console.error('id is undefined');
    return;
  }

  dispatch(setLoading(true));
  try {
    const responseData = await usersServices.deleteUser(id);
    dispatch(deleteUsersSuccess(responseData));
    getUsersAction(page, limit);
  } catch (error) {
    dispatch(setError(error));
  }
};

export const reserUserAction = async (data: ResetPassInterface): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await usersServices.resetUserPassword(data);
    dispatch(resetUserSuccess(responseData));
  } catch (error) {
    let userError;
    if (error.error.code === '23503') {
      userError = new Error('This user is already in use.');
    } else {
      userError = new Error('Something went wrong!');
    }
    dispatch(setError(userError));
  }
};
