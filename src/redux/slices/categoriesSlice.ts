import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
  categories: [],
  isLoading: false,
  error: null,
  message: '',
  responseStatus: '',
};

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload.categories;
      state.count = action.payload.count;
      state.message = '';
      state.responseStatus = '';
      state.error = null;
    },
    logoutCategories() {
      return initialState;
    },
  },
});

// reducer
export default slice.reducer;

// actions
export const { setLoading, setError, getCategoriesSuccess, logoutCategories } = slice.actions;
