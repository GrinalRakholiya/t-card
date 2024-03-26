import { createSlice } from '@reduxjs/toolkit';

import { RoleInterface } from '../../pages/roles/types.ts';

type StateType = {
  count: number;
  roles: RoleInterface[];
  isLoading: boolean;
  error: Error | null;
  message: string;
};

const initialState: StateType = {
  count: 0,
  roles: [],
  isLoading: false,
  error: null,
  message: '',
};

const slice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getRolesSuccess(state, action) {
      state.isLoading = false;
      state.roles = action.payload.rows;
      state.count = action.payload.total_count;
      state.error = null;
    },
    addRolesSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    deleteRolesSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    logoutRole() {
      return initialState;
    },
  },
});

// reducer
export default slice.reducer;

// actions
export const { setLoading, setError, addRolesSuccess, getRolesSuccess, deleteRolesSuccess, logoutRole } = slice.actions;
