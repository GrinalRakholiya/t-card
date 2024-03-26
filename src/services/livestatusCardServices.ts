// utils
import axios from '../utils/axios.ts';
import { ApprovePayloadInterface } from '../components/cardApproveModal/type.ts';

// type LiveStatusCardReponseType = {
//   config: Record<string, unknown>;
//   data: LiveStatusDataType[];
//   headers: Record<string, unknown>;
//   request: Record<string, unknown>;
//   status: number;
//   statusText: string;
// };

// -------------------------------------------------------------------

const getLiveStatusCard = async (params?: Record<string, unknown>): Promise<void> => {
  let url = '/live_card';
  if (params?.searchData) {
    url += `?search=${params.searchData}`;
  }
  if (params?.site_id) {
    url += params.searchData ? `&site_id=${params.site_id}` : `?site_id=${params.site_id}`;
  }
  const response = await axios.get(url);
  return response.data.data;
};

const getLiveVehicle = async (params?: Record<string, unknown>): Promise<void> => {
  let url = '/vehicles/card';
  if (params?.searchData) {
    url += `?search=${params.searchData}`;
  }
  if (params?.site_id) {
    url += params.searchData ? `&site_id=${params.site_id}` : `?site_id=${params.site_id}`;
  }
  const response = await axios.get(url);
  return response.data.data;
};

const approveVehicle = async (qr: string | undefined, data: ApprovePayloadInterface | undefined): Promise<void> => {
  const response = await axios.put(`vehicles/approve/${qr}`, data);
  return response.data.data;
};

const LiveStatusCardService = {
  getLiveStatusCard,
  getLiveVehicle,
  approveVehicle,
};

export default LiveStatusCardService;
