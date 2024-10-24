import { useState } from "react";
import { IEmpresa } from "../../interfaces/IEmpresa";

export const useEmpresas = () => {
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);

  const handleAddEmpresa = (nombre: string) => {
    let nuevaEmpresa: IEmpresa = {
      id: empresas.length + 1,
      nombre: `Empresa ${nombre}`,
      sucursales: []
    };

    setEmpresas((prevEmpresas) => [...prevEmpresas, nuevaEmpresa]);
  };
  
  return {
    empresas,
    handleAddEmpresa
  };
};
