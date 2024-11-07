import { useState } from "react";
import { ServiceEmpresa } from "../services/EmpresaService";
import { ICreateEmpresaDto } from "../types/dtos/empresa/ICreateEmpresaDto";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";

export const useEmpresas = () => {
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);

  const serviceEmpresa = new ServiceEmpresa()

  const handleAddEmpresa = async (newEmpresa: ICreateEmpresaDto) => {
    try{
      const response = await serviceEmpresa.createOneEmpresa(newEmpresa)
      setEmpresas((prev) => [...prev, response.data])
    }catch(error){
      console.error("Error creando empresa, ", error)
    }
  }
  
  const handleDeleteEmpresa = (id: number) => { 
    setEmpresas((prev) =>  prev.filter(empresa => empresa.id !== id))
  }

  return {
    empresas, handleAddEmpresa, handleDeleteEmpresa
  };
};
    /*const handleAddEmpresa = (nombre: string, razonSocial: string, cuil: number, selectedImage: string) => {
      const nuevaEmpresa: IEmpresa = {
        id: new Date().toISOString(),
        nombre: nombre,
        razonSocial: razonSocial,
        cuil: cuil,
        imagen: selectedImage, 
        sucursales: [],
      };
  
      setEmpresas((prevEmpresas) => [...prevEmpresas, nuevaEmpresa]);
    };*/