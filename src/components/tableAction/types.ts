import { DepartmentInterface } from '../../pages/department/types.ts';
import { RoleInterface } from '../../pages/roles/types.ts';
import { SitesInterface } from '../../pages/sites/type.ts';
import { UserInterface } from '../../pages/users/types.ts';
import { VehicleInterface } from '../../pages/vehicle/type.ts';

export interface ActionPropsInterface {
  data: UserInterface | RoleInterface | DepartmentInterface | SitesInterface | VehicleInterface;
  onResetPassword?: (data: UserInterface) => void;
  onDelete?:
    | ((data: UserInterface) => void)
    | ((data: RoleInterface) => void)
    | ((data: DepartmentInterface) => void)
    | ((data: SitesInterface) => void)
    | ((data: VehicleInterface) => void);
  onUpdate?:
    | ((data: UserInterface) => void)
    | ((data: RoleInterface) => void)
    | ((data: DepartmentInterface) => void)
    | ((data: SitesInterface) => void)
    | ((data: VehicleInterface) => void);
  onView?: (data: VehicleInterface) => void;
  deletePopupTitle?: string;
  deletePopupDesc?: string;
  page: number;
  limit: number;
}
