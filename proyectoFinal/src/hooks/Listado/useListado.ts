import { useState } from "react";

interface inter {
  voidEmpresa: ( nombre: string, razonSocial: string, cuil: string, imagen: string | null ) => void;
}

export const useListado = ({ voidEmpresa }: inter) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);

  const agregarEmpresa = () => {
    setIsPopUpVisible(true); // Muestra el modal
  };

  const cerrarPopUp = () => {
    setIsPopUpVisible(false); // Cierra el modal
  };

  const agregarNuevaEmpresa = (
    nombre: string,
    razonSocial: string,
    cuil: string,
    imagen: string | null
  ) => {
    voidEmpresa(nombre, razonSocial, cuil, imagen);
  };

  return {
    isPopUpVisible,
    agregarEmpresa,
    cerrarPopUp,
    agregarNuevaEmpresa
  }
};
