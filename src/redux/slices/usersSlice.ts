import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from '../../pages/users/types.ts';

type StateType = {
  count: number;
  users: UserInterface[];
  isLoading: boolean;
  error: Error | null;
  message: string;
};

const initialState: StateType = {
  count: 0,
  users: [],
  isLoading: false,
  error: null,
  message: '',
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUsersSucess(state, action) {
      state.isLoading = false;
      state.users = action.payload.rows;
      state.count = action.payload.total_count;
      state.error = null;
    },
    addUsersSucess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    editUsersSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    deleteUsersSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    resetUserSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    logoutUsers() {
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
  getUsersSucess,
  addUsersSucess,
  editUsersSuccess,
  deleteUsersSuccess,
  resetUserSuccess,
  logoutUsers,
} = slice.actions;
