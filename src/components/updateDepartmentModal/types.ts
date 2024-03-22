import { DepartmentInterface } from '../../pages/department/types.ts';

export interface UpdateDepartmentModalInterface {
  updateData?: DepartmentInterface | undefined;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  limit: number;
}

export interface SetUpdatedataInterface {
  department: string;
  sequence: number | string;
}
