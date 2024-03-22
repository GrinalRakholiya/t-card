import QRCodeServices from '../../services/QRCodeServices.ts';

import { dispatch } from '../store.ts';
import { setQRCodeData, setError, setLoading } from '../slices/qrcodeSlice.ts';

export const getQRCodeAction = async (totalQRcodes: number): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const data = await QRCodeServices.generateQRCode(totalQRcodes);
    dispatch(setQRCodeData(data));
  } catch (error) {
    dispatch(setError(error));
  }
};
