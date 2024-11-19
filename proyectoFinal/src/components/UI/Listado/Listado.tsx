import { FC, useEffect, useState } from "react";

import { ServiceEmpresa } from "../../../services/ServiceEmpresa";
import { EmpresaListado } from "../../views/Empresas/EmpresasListado/EmpresaListado";
import { UseSucursal } from "../../views/Sucursales/useSucursal/UseSucursal";
import { useDispatch, useSelector } from "react-redux";

import styleListado from "./Listado.module.css";
import { guardarEmpresas } from "../../../slices/empresaSlice";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { RootState } from "../../../hooks/store/store";

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

  // empresaActiva
  const empresaActiva = useSelector(
    (state: RootState) => state.empresa.empresaActiva
  );

  useEffect(() => {
    console.log("Empresa activa : ", empresaActiva);
  }, [empresaActiva]);

  useEffect(() => {
    const fetchEmpresasConSucursales = async () => {
      try {
        // Primero obtenemos todas las empresas
        const empresaDelServicio = await serviceEmpresa.getAllEmpresas();

        setEmpresas(empresaDelServicio);
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
          <EmpresaListado empresas={empresas} />
        </section>

        <section className={styleListado.containerSucursales}>
          <div className={styleListado.containerTituloSucursales}>
            <h2>Sucursales</h2>
          </div>
          {empresas.map((e) => {
            const visible: boolean = e.id === empresaActiva?.id;
            return (
              visible && (
                <UseSucursal
                  key={e.id}
                  empresa={e}
                  onVistaAdmin={onVistaAdmin}
                />
              )
            );
          })}
        </section>
      </article>
    </>
  );
};
//
