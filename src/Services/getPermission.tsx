import { Permission } from '../interfaces/Permission';
import axios from 'axios';

export const getPermission = async (): Promise<Permission[]> => {
  const response = await axios.get<Permission[]>('https://localhost:7198/api/permission');
  return response.data;
}