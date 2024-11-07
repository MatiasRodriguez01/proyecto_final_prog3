import { useEffect, useState } from "react";
import { ISucursal } from "../interfaces/ISucursal";
import { ServiceSucursal } from "../servicios/SucursalService";
import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal";
import { IUpdateSucursal } from "../types/dtos/sucursal/IUpdateSucursal";


export const useSucursales = (empresaId: number) => {

  const [sucursales, setSucursales] = useState<ISucursal[]>([]);

  const serviceSucursal = new ServiceSucursal();

  const fetchSucursales = async () => {
    try {
      const response = await serviceSucursal.getAllSucursalesByEmpresa(empresaId);
      setSucursales(response.data);
    } catch (error) {
      console.error("Error trayendo las sucursales:", error);
    }
  };

  useEffect(() => {
    if(empresaId){
      fetchSucursales();
    }
  }, [empresaId]);

  const handleAddSucursal = async (newSucursalData: ICreateSucursal) => {
    try {
      const response = await serviceSucursal.createOneSucursalByEmpresa(newSucursalData);
      setSucursales((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error añadiendo sucursal:", error);
    }
  };

  const handleUpdateSucursal = async (id: number, sucursal: IUpdateSucursal) => {
    try {
      const response = await serviceSucursal.editOneSucursal(id, sucursal);
      setSucursales((prev) =>
        prev.map((item) => (item.id === id.toString() ? {...item, ...response.data} : item))
      ); // Actualiza la sucursal en el estado
    } catch (error) {
      console.error("Error al actualizar la sucursal:", error);
    }
  };

  /*const handleDeleteSucursal = async (id: number) => {
    try {
      await serviceSucursal.deleteSucursal(id);
      setSucursales((prev) => prev.filter((sucursal) => sucursal.id !== id));
    } catch (error) {
      console.error("Error eliminando sucursal:", error);
    }
  };*/




  /*const handleAddSucursal = (nombre: string,
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
    imagen: string) => {
    const nuevaEmpresa: ISucursal = {
      id:  new Date().toISOString(),
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
      imagen: imagen
    };

    setSucursales((prevSucursales) => [...prevSucursales, nuevaEmpresa]);
  };*/

  const handleDeleteSucursal = (id: string) => { 
    setSucursales((prev) =>  prev.filter(sucursal => sucursal.id !== id))
  }

  return {
    sucursales, 
    handleAddSucursal, 
    handleUpdateSucursal,
    handleDeleteSucursal
  };
};