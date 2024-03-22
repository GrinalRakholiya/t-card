import { CardComponentProps } from '../card/type.ts';

export interface CardApproveModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cardData: CardComponentProps | undefined;
}

export interface ApprovePayloadInterface {
  approved: boolean;
  parked_at: string;
  department_id?: string;
}
