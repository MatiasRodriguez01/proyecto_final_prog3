import { useState } from "react";

export const useListado = (handleAddEmpresa: Function, handleAddSucursal: Function, handleAddAlergeno: Function) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);

  const HandlePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible)
  }

  const agregarNuevaEmpresa = (
    nombre: string,
    razonSocial: string,
    cuil: number,
    imagen: string
  ) => {
    handleAddEmpresa(nombre, razonSocial, cuil, imagen);
  };


  const agregarNuevaSucursal = (
    nombre: string,
    horarioApertura: string,
    horarioCierre: string,
    pais: string,
    localidad: string,
    provincia: string,
    latitud: string,
    longitud: string,
    nombreCalle: string,
    numeroCalle: number,
    codigoPostal: number,
    numeroPiso: number,
    numeroDepartamento: number,
    imagen: string
  ) => {
    handleAddSucursal(
      nombre,
      horarioApertura,
      horarioCierre,
      pais,
      provincia,
      localidad,
      latitud,
      longitud,
      nombreCalle,
      numeroCalle,
      codigoPostal,
      numeroPiso,
      numeroDepartamento,
      imagen)
  }

  const agregarAlergeno = (
    nombre: string,
    imagen: string
  ) => {
    handleAddAlergeno(
      nombre,
      imagen
    )
  }

  

  return {
    isPopUpVisible,
    HandlePopUp,
    agregarNuevaEmpresa,
    agregarNuevaSucursal,
    agregarAlergeno
  };
};
