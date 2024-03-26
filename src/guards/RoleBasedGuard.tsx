import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector, AppState } from '../redux/store.ts';
import { setUserRoutePermissions } from '../redux/slices/authSlice.ts';
import { RolePermissions, DynamicRolePermissionType, DynamicSitePermissionType } from '../utils/RolePermission.ts';
import { route } from '../routes/path.ts';

// ----------------------------------------------------------------------

type PropTypes = {
  children: React.ReactNode;
};

export const RoleBasedGuard: React.FC<PropTypes> = ({ children }) => {
  const { pathname } = useLocation();
  const userData = useSelector((state: AppState) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let hasPermission = false;

  const path = pathname.split('/')[1];
  const routePermissions: string[] = RolePermissions[userData.role as keyof DynamicRolePermissionType]
    ? RolePermissions[userData.role as keyof DynamicRolePermissionType][path as keyof DynamicSitePermissionType]
    : [];

  // '/' route is a sample page. it will be removed in future. when it is remived remove this condition
  if (pathname === '/') {
    hasPermission = true;
  }
  if (routePermissions && routePermissions.length) {
    if (routePermissions?.includes('view')) {
      hasPermission = true;
    }
    dispatch(setUserRoutePermissions(routePermissions));
  }
  if (!hasPermission) {
    navigate(route.PAGENOTFOUND.path);
  }

  return children;
};
