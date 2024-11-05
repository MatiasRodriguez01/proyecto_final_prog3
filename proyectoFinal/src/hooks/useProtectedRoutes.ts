import { useState } from "react";

export const useListado = (handleAddCategoria: Function, handleAddProducto: Function, handleAddAlergeno: Function) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);

  const HandlePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible)
  }

  const agregarNuevaCategoria = (
    nombre: string,
    imagen: string
  ) => {
    handleAddCategoria(nombre, imagen)
  }

  const agregarNuevoProducto = (
    nombre: string,
    imagen: string
  ) => {
    handleAddProducto(nombre, imagen)
  }

  const agregarNuevoAlergeno = (
    nombre: string,
    imagen: string
  ) => {
    handleAddAlergeno(nombre, imagen);
  };
  

  return {
    isPopUpVisible,
    HandlePopUp,
    agregarNuevoProducto,
    agregarNuevoAlergeno,
    agregarNuevaCategoria
  };
};
