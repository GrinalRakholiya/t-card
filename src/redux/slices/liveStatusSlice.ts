import { createSlice } from '@reduxjs/toolkit';
import { CardDetailsInterface } from '../../components/card/type.ts';

interface LiveStatusCardState {
  isLoading: boolean;
  error: unknown;
  message: string;
  data: CardDetailsInterface[];
  awaitingData: CardDetailsInterface[];
}

const initialState: LiveStatusCardState = {
  isLoading: false,
  error: null,
  message: '',
  data: [],
  awaitingData: [],
};

const liveStatusCardSlice = createSlice({
  name: 'liveStatusCard',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setLiveStatusData: (state, action) => {
      state.data = action.payload.rows;
      state.isLoading = false;
      state.message = '';
      state.error = null;
    },
    setLiveVehicle: (state, action) => {
      state.awaitingData = action.payload.rows;
      state.isLoading = false;
      state.message = '';
      state.error = null;
    },
    setApproveVehicle: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = null;
    },
    logoutliveStatus() {
      return initialState;
    },
  },
});

// reducer
export default liveStatusCardSlice.reducer;

// actions
export const { setLiveStatusData, setError, setLoading, logoutliveStatus, setLiveVehicle, setApproveVehicle } =
  liveStatusCardSlice.actions;
