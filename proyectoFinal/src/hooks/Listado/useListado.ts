import { useState } from "react";
import { useEmpresas } from "../empresas/useEmpresas";

export const useListado = () => {
  const { empresas, handleAddEmpresa } = useEmpresas();
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
    handleAddEmpresa(nombre, razonSocial, cuil, imagen);
  };

  return {
    empresas,  
    isPopUpVisible,
    agregarEmpresa,
    cerrarPopUp,
    agregarNuevaEmpresa
  }
};
