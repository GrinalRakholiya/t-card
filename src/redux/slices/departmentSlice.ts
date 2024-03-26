import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
  department: [],
  isLoading: false,
  error: null,
  message: '',
};

const slice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getDepartmentSuccess(state, action) {
      state.isLoading = false;
      state.department = action.payload.rows;
      state.count = action.payload.total_count;
      state.error = null;
    },
    addDepartmentSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    deleteDepartmentSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    updateDepartmentSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    logoutDepartment() {
      return initialState;
    },
  },
});

// reducer
export default slice.reducer;

// actions
export const {
  setLoading,
  setError,
  addDepartmentSuccess,
  getDepartmentSuccess,
  deleteDepartmentSuccess,
  updateDepartmentSuccess,
  logoutDepartment,
} = slice.actions;
