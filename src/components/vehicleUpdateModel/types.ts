import { CardComponentProps } from '../card/type.ts';

export interface VehicleUpdateModelProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vehicleData: CardComponentProps | undefined;
}
