import { FC, useEffect, useState } from "react";
import { useEmpresas } from "../../../hooks/useEmpresas";
import { useInformacion } from "../../../hooks/useInformacion";
import { useListado } from "../../../hooks/useListado";

import ModalCrearEmpresa from "../../views/Empresas/ModalCrearEmpresa/ModalCrearEmpresa";
import EmpresaCard from "../../views/Empresas/EmpresaCard/EmpresaCard";

import styleListado from "./Listado.module.css";
import { EmpresaInfo } from "../../views/Empresas/EmpresaInfo/EmpresaInfo";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { ServiceEmpresa } from "../../../services/EmpresaService";
import { EmpresaListado } from "../../views/Empresas/EmpresasListado/EmpresaListado";

export const Listado: FC = () => {
  //const { empresas, handleAddEmpresa, handleDeleteEmpresa } = useEmpresas();
  const [ empresas, setEmpresas ] = useState<IEmpresa[]>([]);
  const serviceEmpresa = new ServiceEmpresa();


  const [empresaActiva, setEmpresaActiva] = useState<number | null>(null);
  
  const handleEmpresaActiva = (id: number) => {
    setEmpresaActiva(id);
  };

  useEffect(() => {
    const fetchEmpresas = async () => {
      const e = await serviceEmpresa.getAllEmpresas();
      setEmpresas(e);
      console.log("Empresas:", empresas) // Verifica si `empresas` contiene datos
    }
    fetchEmpresas()
  }, [empresas]);


  return (
    <>
      <article className={styleListado.container}>

        <section className={styleListado.containerEmpresas}>
          <EmpresaListado empresas={empresas} onEmpresaActiva={handleEmpresaActiva}/>
        </section>

        <section className={styleListado.containerSucursales}>
          <div className={styleListado.titulo}>
            <h2>Sucursales</h2>
          </div>
        </section>

      </article>
    </>
  );
};
// 