import { VehicleInterface } from '../../pages/vehicle/type.ts';

export interface DataInterface {
  viewData: VehicleInterface | undefined;
  isUpdateOpen: boolean;
  setIsUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  limit: number;
}

export interface SetUpdateVehicleInterface {
  key_tag: number;
  parked_at: string;
}
