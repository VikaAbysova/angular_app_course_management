import { Name } from './name.interface';
export interface UserEntity {
  id?: number;
  token: string;
  name: Name;
  login: string;
  password: string;
}
