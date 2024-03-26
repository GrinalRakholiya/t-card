export interface UserInterface {
  id: number;
  user_name: string;
  password: string;
  name: string;
  role_id: string;
  phone_number: string;
  email: string;
  assigned_site: string;
  assigned_department: string;
  created_at: number;
  updated_at: number;
}

export interface AddUserInterface {
  user_name: string;
  name: string;
  password: string;
  phone_number: string;
  email: string;
  role_id: string;
  assigned_site: string;
  assigned_department: string;
}

export type DynamicAddUserType = {
  [K in keyof AddUserInterface]: string;
};

export interface FieldInterface {
  username?: string;
  remember?: string;
  name?: string;
}
