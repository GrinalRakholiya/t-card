import { SitesInterface } from '../../pages/sites/type.ts';

export interface UpdateSiteModalInterface {
  updateData?: SitesInterface | undefined;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  limit: number;
}

export interface HoursINterface {
  value: string;
  label: string;
}
