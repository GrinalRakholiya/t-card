import { NavigateFunction } from 'react-router';

import AuthService from '../../services/authServices.ts';
import { setToken } from '../../utils/localStorageHelper.ts';
import { dispatch } from '../store.ts';
import { loginSuccess, logoutSuccess, setError, setLoading } from '../slices/authSlice.ts';
import { logoutCategories } from '../slices/categoriesSlice.ts';
import { logoutliveStatus } from '../slices/liveStatusSlice.ts';
import { logoutQRCode } from '../slices/qrcodeSlice.ts';
import { logoutRole } from '../slices/rolesSlice.ts';
import { logoutDepartment } from '../slices/departmentSlice.ts';
import { logoutSites } from '../slices/sitesSlice.ts';
import { logoutUsers } from '../slices/usersSlice.ts';
import { logoutVehicles } from '../slices/vehiclesSlice.ts';
import { UserDataType } from '../../types/UserTypes.ts';

let refreshTokenInterval: ReturnType<typeof setInterval>;

export const loginAction = async (username: string, password: string, navigate: NavigateFunction): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const data: UserDataType = await AuthService.login(username, password);
    dispatch(loginSuccess(data));
    setToken(data.auth_token);
    // It will call refresh-token api after 28 minutes and update the token (the token expires after 30 minutes)
    refreshTokenInterval = setInterval(() => {
      refreshTokenAction();
    }, 1680000);
    navigate('/');
  } catch (error) {
    dispatch(setError(error));
  }
};

export const refreshTokenAction = async (): Promise<void> => {
  try {
    const data: UserDataType = await AuthService.refreshToken();
    dispatch(loginSuccess(data));
    setToken(data.auth_token);
  } catch (error) {
    dispatch(setError(error));
  }
};

export const logoutAction = (): void => {
  setToken('');
  dispatch(logoutSuccess());
  dispatch(logoutCategories());
  dispatch(logoutliveStatus());
  dispatch(logoutQRCode());
  dispatch(logoutRole());
  dispatch(logoutDepartment());
  dispatch(logoutSites());
  dispatch(logoutUsers());
  dispatch(logoutVehicles());
  clearInterval(refreshTokenInterval);
};
