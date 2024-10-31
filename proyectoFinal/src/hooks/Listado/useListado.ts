import { useState } from "react";

export const useListado = (handleAddEmpresa: Function) => {
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

  return {
    isPopUpVisible,
    HandlePopUp,
    agregarNuevaEmpresa,
  };
};
