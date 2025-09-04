import { Role } from './role.model';

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: Role;
}
