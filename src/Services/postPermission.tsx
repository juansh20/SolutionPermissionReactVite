import { Permission } from '../interfaces/Permission';
import axios from 'axios';

export const postPermission = async (permission: Permission): Promise<Permission> => {
  const response = await axios.post<Permission>('https://localhost:7198/api/permission', permission);
  return response.data;
}
