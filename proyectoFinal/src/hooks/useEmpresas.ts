import { useEffect, useState } from "react";
import { IEmpresa } from "../interfaces/IEmpresa";
import { ServiceEmpresa } from "../servicios/EmpresaService";
import { ICreateEmpresaDto } from "../types/dtos/empresa/ICreateEmpresaDto";

export const useEmpresas = () => {
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);

  const serviceEmpresa = new ServiceEmpresa()

  let idEmpresa = 0;

  const handleAddEmpresa = async (newEmpresa: ICreateEmpresaDto) => {
    try{
      const response = await serviceEmpresa.createOneEmpresa(newEmpresa)
      idEmpresa = response.data.id;
      setEmpresas((prev) => [...prev, response.data])
    }catch(error){
      console.error("Error creando empresa, ", error)
    }
  }

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

  const handleDeleteEmpresa = (id: string) => { 
    setEmpresas((prev) =>  prev.filter(empresa => empresa.id !== id))
  }

  return {
    empresas, handleAddEmpresa, handleDeleteEmpresa, idEmpresa
  };
};