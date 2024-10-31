import { useState } from "react";
import { useEmpresas } from "../empresas/useEmpresas";

// interface inter {
//   voidEmpresa: Function;
// }

export const useListado = () => {

  const { empresas, handleAddEmpresa, handleDeleteEmpresa } = useEmpresas();
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
    cuil: number,
    imagen: string
  ) => {
    handleAddEmpresa(nombre, razonSocial, cuil, imagen);
  };

  return {
    empresas,
    handleDeleteEmpresa,
    isPopUpVisible,
    agregarEmpresa,
    cerrarPopUp,
    agregarNuevaEmpresa
  }
};