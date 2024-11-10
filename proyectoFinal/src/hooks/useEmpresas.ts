import { useState, useEffect } from "react";
import { ServiceEmpresa } from "../services/ServiceEmpresa";
import { ICreateEmpresaDto } from "../types/dtos/empresa/ICreateEmpresaDto";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";

export const useEmpresas = () => {
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);

  const serviceEmpresa = new ServiceEmpresa();

  // // Función para cargar empresas al montar el componente
  // const loadEmpresas = async () => {
  //   try {
  //     const response = await serviceEmpresa.getAllEmpresas();
  //     setEmpresas(response.data);
  //   } catch (error) {
  //     console.error("Error al cargar empresas: ", error);
  //   }
  // };

  const handleAddEmpresa = async (newEmpresa: ICreateEmpresaDto) => {
    try {
      // const response = await serviceEmpresa.createOneEmpresa(newEmpresa);
      // setEmpresas((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error creando empresa: ", error);
    }
  };

  const handleDeleteEmpresa = (id: number) => {
    setEmpresas((prev) => prev.filter((empresa) => empresa.id !== id));
  };

  return {
    empresas,
    handleAddEmpresa,
    handleDeleteEmpresa,
  };
};
