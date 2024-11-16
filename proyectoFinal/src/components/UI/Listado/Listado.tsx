import { FC, useEffect, useState } from "react";

import { ServiceEmpresa } from "../../../services/ServiceEmpresa";
import { EmpresaListado } from "../../views/Empresas/EmpresasListado/EmpresaListado";
import { UseSucursal } from "../../views/Sucursales/useSucursal/UseSucursal";
import { useDispatch } from "react-redux";

import styleListado from './Listado.module.css'
import { guardarEmpresas } from "../../../slices/empresaSlice";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";

interface IPropsListado {
  onVistaAdmin: () => void;
}

export const Listado: FC<IPropsListado> = ({ onVistaAdmin }) => {

  // Usamos dispatch para enviar acciones a Redux
  const dispatch = useDispatch();

  // Obtenemos las empresas 
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);

  // los servicios
  const serviceEmpresa = new ServiceEmpresa();

  // usamos el
  const [clickEmpresa, setClickEmpresa] = useState<number>(0);

  const handleChangeEmpresa = (newNumber: number) => {
    setClickEmpresa(newNumber);
  };

  useEffect(() => {
    const fetchEmpresasConSucursales = async () => {
      try {
        // Primero obtenemos todas las empresas
        const empresaDelServicio = await serviceEmpresa.getAllEmpresas();

        setEmpresas(empresaDelServicio)
        // Actualizamos el estado de empresas en Redux
        dispatch(guardarEmpresas(empresaDelServicio));
      } catch (error) {
        console.error("Error al obtener las empresas:", error);
      }
    };

    fetchEmpresasConSucursales();
    // fetchSucursales()
  }, [empresas, dispatch]);

  return (
    <>
      <article className={styleListado.container}>
        <section className={styleListado.containerEmpresas}>
          <EmpresaListado
            empresas={empresas}
            EmpresaActiva={handleChangeEmpresa}
          />
        </section>

        <section className={styleListado.containerSucursales}>
          <h2>Sucursales</h2>
          {empresas.map((e) =>
            clickEmpresa === e.id && (
              <UseSucursal key = {e.id} empresa={e} onVistaAdmin={onVistaAdmin} />
            )
        )}
        </section>
      </article>
    </> 
  );
};
//
