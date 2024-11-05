import { useState } from "react";
import { ICategoria } from "../interfaces/ICategoria";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  const handleAddCategoria} = (
    denominacion: string
) => {
    const nuevaCategoria: ICategoria = {
      id: new Date().toISOString(),
      denominacion: denominacion,
    };

    setCategorias((prevCategorias) => [...prevCategorias, nuevaCategoria]);
  };

  const handleDeleteCategoria = (id: string) => { 
    setCategorias((prev) =>  prev.filter(categoria => categoria.id !== id))
  }

  return {
    categorias, handleAddCategoria, handleDeleteCategoria
};