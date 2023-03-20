export interface Permission{
    id: number,
    nombreEmpleado:string,
    apellidoEmpleado:string,
    tipoPermiso:number,
    fechaPermiso:Date,
    permissionType:permissionType
}

export interface permissionType{
    id:number,
    descripcion:string
}