import { createSlice } from '@reduxjs/toolkit';
import { VehicleInterface } from '../../pages/vehicle/type.ts';

type StateType = {
  count: number;
  vehicles: VehicleInterface[];
  isLoading: boolean;
  error: Error | null;
  message: string;
};

const initialState: StateType = {
  count: 0,
  vehicles: [],
  isLoading: false,
  error: null,
  message: '',
};

const slice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getVehiclesSucess(state, action) {
      state.isLoading = false;
      state.vehicles = action.payload.rows;
      state.count = action.payload.total_count;
      state.error = null;
    },
    updateVehiclesSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    deleteVehiclesSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    logoutVehicles() {
      return initialState;
    },
  },
});

// reducer
export default slice.reducer;

// actions
export const { setLoading, setError, getVehiclesSucess, deleteVehiclesSuccess, updateVehiclesSuccess, logoutVehicles } =
  slice.actions;
