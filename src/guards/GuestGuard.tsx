import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { getToken } from '../utils/localStorageHelper.ts';
import { route } from '../routes/path.ts';

// ----------------------------------------------------------------------

type PropTypes = {
  children: React.ReactNode;
};

export const GuestGuard: React.FC<PropTypes> = ({ children }) => {
  const token = getToken();

  if (token) {
    return <Navigate to={route.DASHBOARD.path} />;
  }

  return children;
};
