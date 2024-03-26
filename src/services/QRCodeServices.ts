// utils
import axios from '../utils/axios.ts';

// type QRCodeReponseType = {
//   config: Record<string, unknown>;
//   data: QRCodeInterface;
//   headers: Record<string, unknown>;
//   request: Record<string, unknown>;
//   status: number;
//   statusText: string;
// };

// -------------------------------------------------------------------

const generateQRCode = async (totalQRcodes: number): Promise<void> => {
  const response = await axios.post(`/qr/count/${totalQRcodes}`);
  return response.data.data;
};
const QRCodeServices = {
  generateQRCode,
};

export default QRCodeServices;
