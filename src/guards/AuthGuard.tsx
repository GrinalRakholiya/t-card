import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { route } from '../routes/path.ts';
import { getToken } from '../utils/localStorageHelper.ts';

// ----------------------------------------------------------------------

type PropTypes = {
  children: React.ReactNode;
};

export const AuthGuard: React.FC<PropTypes> = ({ children }) => {
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState('');
  const token = getToken();

  if (!token) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={route.LOGIN.path} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation('');
    return <Navigate to={requestedLocation} />;
  }

  return children;
};
