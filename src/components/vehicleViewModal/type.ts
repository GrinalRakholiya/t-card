import { VehicleInterface } from '../../pages/vehicle/type.ts';

export interface DataInterface {
  viewData: VehicleInterface | undefined;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
