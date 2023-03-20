import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Permission } from '../interfaces/Permission';
import PermissionForm from './PermissionForm';
import { getPermission } from '../Services/getPermission';

const PermissionTable: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPermission, setSelectedPermission] = useState<Permission | undefined>();

  const onLoadData=async()=>{
    const fetchPermissions = async () => {
        const data = await getPermission();
        setPermissions(data);
      };
      fetchPermissions();
  };

  useEffect(() => {
    onLoadData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setSelectedPermission(undefined);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPermission(undefined);
  };

  const handleSave = (permission: Permission) => {
    const updatedPermissions = selectedPermission
      ? permissions.map((p) => (p.id === permission.id ? permission : p))
      : [...permissions, permission];
    setPermissions(updatedPermissions);
    handleClose();
    onLoadData();
  };

  const handleEdit = (permission: Permission) => {
    setSelectedPermission(permission);
    setOpen(true);
  };

  return (
    <Box bgcolor="#fff" p={2}>
      <Typography variant="h5" component="h1" align="center" gutterBottom color="#000">
        Lista de Permisos
      </Typography>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#2196f3' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Id</TableCell>
              <TableCell sx={{ color: '#fff' }}>Nombre del Empleado</TableCell>
              <TableCell sx={{ color: '#fff' }}>Apellido del Empleado</TableCell>
              <TableCell sx={{ color: '#fff' }}>Tipo de Permiso</TableCell>
              <TableCell sx={{ color: '#fff' }}>Fecha de Permiso</TableCell>
              <TableCell sx={{ color: '#fff' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>{permission.id}</TableCell>
                <TableCell>{permission.nombreEmpleado}</TableCell>
                <TableCell>{permission.apellidoEmpleado}</TableCell>
                <TableCell>{permission.permissionType.descripcion}</TableCell>
                <TableCell>{permission.fechaPermiso && new Date(permission.fechaPermiso).toDateString()}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(permission)}>Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleOpen}>Nuevo Permiso</Button>
      <PermissionForm open={open} onClose={handleClose} permission={selectedPermission} onSave={handleSave} />
    </Box>
  );
};

export default PermissionTable;
