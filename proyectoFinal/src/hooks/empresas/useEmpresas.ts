import { useState } from "react";
import { IEmpresa } from "../../interfaces/IEmpresa";

export const useEmpresas = () => {
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);

  const handleAddEmpresa = (nombre: string, razonSocial: string, cuil: number, selectedImage: string) => {
    const nuevaEmpresa: IEmpresa = {
      id: empresas.length + 1,
      nombre: nombre,
      razonSocial: razonSocial,
      cuil: cuil,
      imagen: selectedImage, 
      sucursales: [],
    };

    setEmpresas((prevEmpresas) => [...prevEmpresas, nuevaEmpresa]);
  };

  const handleDeleteEmpresa = (id: number) => { 
    setEmpresas((prev) =>  prev.filter(empresa => empresa.id !== id))
  }

  return {
    empresas, handleAddEmpresa, handleDeleteEmpresa
  };
};