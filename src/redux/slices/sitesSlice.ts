import { createSlice } from '@reduxjs/toolkit';
import { SitesInterface } from '../../pages/sites/type.ts';

type StateType = {
  count: number;
  sites: SitesInterface[];
  isLoading: boolean;
  error: Error | null;
  message: string;
};

const initialState: StateType = {
  count: 0,
  sites: [],
  isLoading: false,
  error: null,
  message: '',
};

const slice = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getSitesSucess(state, action) {
      state.isLoading = false;
      state.sites = action.payload.rows;
      state.count = action.payload.total_count;
      state.error = null;
    },
    addSitesSucess(state, action) {
      state.isLoading = false;
      state.sites = [...state.sites, ...action.payload.rows];
      state.message = action.payload.message;
      state.error = null;
    },
    editSitesSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    deleteSitesSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    logoutSites() {
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
  getSitesSucess,
  addSitesSucess,
  editSitesSuccess,
  deleteSitesSuccess,
  logoutSites,
} = slice.actions;
