import { useState } from "react";
import { ISucursal } from "../interfaces/ISucursal";
export const useSucursales = () => {
  const [sucursales, setSucursales] = useState<ISucursal[]>([]);

  const handleAddSucursal = (
    nombre: string,
    horarioApertura: string,
    horarioCierre: string,
    pais: string,
    provincia: string,
    localidad: string,
    latitud: string,
    longitud: string,
    nombreCalle: string,
    numeroCalle: number,
    codigoPostal: number,
    numeroPiso: number,
    numeroDepartamento: number,
    imagen: string
  ) => {
    const nuevaEmpresa: ISucursal = {
      id: new Date().toISOString(),
      nombre: nombre,
      horarioApertura: horarioApertura,
      horarioCierre: horarioCierre,
      pais: pais,
      provincia: provincia,
      localidad: localidad,
      latitud: latitud,
      longitud: longitud,
      nombreCalle: nombreCalle,
      numeroCalle: numeroCalle,
      codigoPostal: codigoPostal,
      numeroPiso: numeroPiso,
      numeroDepartamento: numeroDepartamento,
      imagen: imagen,
    };

    setSucursales((prevSucursales) => [...prevSucursales, nuevaEmpresa]);
  };

  const handleDeleteSucursal = (id: string) => {
    setSucursales((prev) => prev.filter((sucursal) => sucursal.id !== id));
  };

  return {
    sucursales,
    handleAddSucursal,
    handleDeleteSucursal,
  };
};
