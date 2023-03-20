import { Permission } from '../interfaces/Permission';
import axios from 'axios';

export const putPermission = async (permission: Permission): Promise<Permission> => {
  const response = await axios.put<Permission>(`https://localhost:7198/api/permission/${permission.id}`, permission);
  return response.data;
}