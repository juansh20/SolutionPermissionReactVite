import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Permission } from "../interfaces/Permission";
import { putPermission } from "../Services/putPermission";
import { postPermission } from "../Services/postPermission";
import { permissionTypes } from "../Data/PermissionType";

interface PermissionFormProps {
  open: boolean;
  onClose: () => void;
  permission?: Permission;
  onSave: (permission: Permission) => void;
}

interface FormData {
  nombreEmpleado: string;
  apellidoEmpleado: string;
  tipoPermiso: number;
  fechaPermiso: Date;
}

const PermissionForm: React.FC<PermissionFormProps> = ({ open, onClose, permission, onSave }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [permissionData, setPermissionData] = useState<Permission>(permission || {} as Permission);

  useEffect(() => {
    setPermissionData(permission || {} as Permission);
  }, [permission]);

  const handleFormSubmit = async (data: FormData) => {
    const newPermission: Permission = { ...data, tipoPermiso: parseInt(data.tipoPermiso.toString()), id: permissionData.id, fechaPermiso: permissionData.fechaPermiso, permissionType: permissionTypes[0] };
    let savedPermission: Permission;
    if (permissionData.id) {
      savedPermission = await putPermission(newPermission);
    } else {
      savedPermission = await postPermission(newPermission);
    }
    onSave(savedPermission);
    reset();
    onClose();

    return true;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle>{permission ? "Modificar Permiso" : "Nuevo Permiso"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre del empleado"
            {...register("nombreEmpleado")}
            value={permissionData.nombreEmpleado || ""}
            onChange={(e) => setPermissionData({...permissionData, nombreEmpleado: e.target.value})}

            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Apellido del empleado"
            {...register("apellidoEmpleado")}
            value={permissionData.apellidoEmpleado || ""}
            onChange={(e) => setPermissionData({...permissionData, apellidoEmpleado: e.target.value})}

            required
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="tipoPermiso-label">Tipo de Permiso</InputLabel>
            <Select
              labelId="tipoPermiso-label"
              {...register("tipoPermiso")}
              value={permissionData.tipoPermiso || 0}
              onChange={(e) => setPermissionData({...permissionData, tipoPermiso: parseInt(e.target.value as string)})}

              required
            >
              {permissionTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button type="submit">{permission ? "Guardar" : "Crear"}</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PermissionForm;
