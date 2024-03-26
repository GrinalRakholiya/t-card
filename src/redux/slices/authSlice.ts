import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  routePermissions: [],
  isLoadig: false,
  error: null,
  message: '',
  responseStatus: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoadig = action.payload;
    },
    setError(state, action) {
      state.isLoadig = false;
      state.error = action.payload;
    },
    loginSuccess(state, action) {
      state.isLoadig = false;
      state.userData = action.payload;
      state.message = '';
      state.responseStatus = '';
      state.error = null;
    },
    setUserRoutePermissions(state, action) {
      state.routePermissions = action.payload;
    },
    logoutSuccess() {
      return initialState;
    },
  },
});

// reducer
export default slice.reducer;

// actions
export const { setLoading, setError, loginSuccess, logoutSuccess, setUserRoutePermissions } = slice.actions;
