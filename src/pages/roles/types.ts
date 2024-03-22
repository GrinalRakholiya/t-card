export interface RoleInterface {
  id: number;
  role: string;
  role_id: string;
  created_at: string;
  updated_at: string;
}

export interface FieldInterface {
  username?: string;
  remember?: string;
  name?: string | undefined;
}
