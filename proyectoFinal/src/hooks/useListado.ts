import { useState } from "react";

export const useListado = (handleAddEmpresa: Function, handleAddSucursal: Function) => {
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
    esCasaMatriz: boolean,
    latitud: number,
    longitud: number,
    domicilio: {
      calle: string,
      numero: number,
      cp: number,
      piso: number,
      nroDpto: number,
      idLocalidad: number
    },
    idEmpresa: number,
    logo: string | null
  ) => {
    handleAddSucursal(
      nombre,
      horarioApertura,
      horarioCierre,
      esCasaMatriz,
      latitud,
      longitud,
      domicilio,
      idEmpresa,
      logo
  )};

  return {
    isPopUpVisible,
    HandlePopUp,
    agregarNuevaEmpresa,
    agregarNuevaSucursal
  };
};
