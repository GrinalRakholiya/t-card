import { CardComponentProps } from '../card/type.ts';

export interface VehicleUpdateModelProps {
  vehicleData: CardComponentProps | undefined;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SetVehicleUpdateInterface {
  keys: number;
  owner: number;
  price: number;
  stock_number: number;
  miles: number;
  mechanical_info: string;
  additional_spec_and_info: string;
}
