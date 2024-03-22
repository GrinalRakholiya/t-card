import { createSlice } from '@reduxjs/toolkit';
import { QrcodeDataInterface } from '../../pages/QRCode/type.ts';

interface LiveStatusCardState {
  isLoading: boolean;
  error: unknown;
  message: string;
  data: QrcodeDataInterface[];
}

const initialState: LiveStatusCardState = {
  isLoading: false,
  data: [],
  error: null,
  message: '',
};

const qrCodeSlice = createSlice({
  name: 'QRCode',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setQRCodeData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.message = '';
      state.error = null;
    },
    logoutQRCode() {
      return initialState;
    },
  },
});

// reducer
export default qrCodeSlice.reducer;

// actions
export const { setQRCodeData, setError, setLoading, logoutQRCode } = qrCodeSlice.actions;
