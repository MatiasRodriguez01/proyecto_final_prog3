import { useState } from "react";

export const useListado = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);

  const HandlePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible)
  }
<<<<<<< HEAD
  
  return {
    isPopUpVisible,
    HandlePopUp
=======

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


  

  return {
    isPopUpVisible,
    HandlePopUp,
    agregarNuevaEmpresa,
    agregarNuevaSucursal,
>>>>>>> desarrollo
  };
};

    // const agregarNuevaEmpresa = (
    //   nombre: string,
    //   razonSocial: string,
    //   cuil: number,
    //   imagen: string
    // ) => {
    //   handleAddEmpresa(nombre, razonSocial, cuil, imagen);
    // };
  
  
    // const agregarNuevaSucursal = (
    //   nombre: string,
    //   horarioApertura: string,
    //   horarioCierre: string,
    //   esCasaMatriz: boolean,
    //   latitud: number,
    //   longitud: number,
    //   domicilio: {
    //     calle: string,
    //     numero: number,
    //     cp: number,
    //     piso: number,
    //     nroDpto: number,
    //     idLocalidad: number
    //   },
    //   idEmpresa: number,
    //   logo: string | null
    // ) => {
    //   handleAddSucursal(
    //     nombre,
    //     horarioApertura,
    //     horarioCierre,
    //     esCasaMatriz,
    //     latitud,
    //     longitud,
    //     domicilio,
    //     idEmpresa,
    //     logo
    // )};