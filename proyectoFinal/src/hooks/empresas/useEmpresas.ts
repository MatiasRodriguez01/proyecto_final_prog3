import { useState } from "react";
import { IEmpresa } from "../../interfaces/IEmpresa";
import { ISucursales } from "../../interfaces/ISucursal";

const s1: ISucursales = {
  id: 1,
  nombre: 'sucursal 1'
} 
const s2: ISucursales = {
  id: 2,
  nombre: 'sucursal 2'
} 
const s3: ISucursales = {
  id: 3,
  nombre: 'sucursal 3'
} 

export const useEmpresas = () => {
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);

  const handleAddEmpresa = (nombre: string, razonSocial: string, cuil: number, selectedImage: string) => {
    const nuevaEmpresa: IEmpresa = {
      id: empresas.length + 1,
      nombre: nombre,
      razonSocial: razonSocial,
      cuil: cuil,
      imagen: selectedImage, 
      sucursales: [s1, s2, s3],
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