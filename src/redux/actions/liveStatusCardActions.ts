import LiveStatusCardService from '../../services/livestatusCardServices.ts';
// import { LiveStatusDataType } from '../../types/liveStatusTypes.ts';
// import dummyCardData from '../../dummydata/cardData.json';

import { dispatch } from '../store.ts';
import {
  setLiveStatusData,
  setError,
  setLoading,
  setLiveVehicle,
  setApproveVehicle,
} from '../slices/liveStatusSlice.ts';
import { ApprovePayloadInterface } from '../../components/cardApproveModal/type.ts';

export const getLiveStatusAction = async (params?: Record<string, unknown>): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const data = await LiveStatusCardService.getLiveStatusCard(params);
    dispatch(setLiveStatusData(data));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const getLiveVehicleAction = async (params?: Record<string, unknown>): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const data = await LiveStatusCardService.getLiveVehicle(params);
    dispatch(setLiveVehicle(data));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const approveVehicleAction = async (
  qr: string | undefined,
  cardData: ApprovePayloadInterface
): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const data = await LiveStatusCardService.approveVehicle(qr, cardData);
    dispatch(setApproveVehicle(data));
    getLiveStatusAction();
    getLiveVehicleAction();
  } catch (error) {
    dispatch(setError(error));
  }
};
