import { FC, useEffect, useState } from "react";

import styleListado from "./Listado.module.css";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { ServiceEmpresa } from "../../../services/ServiceEmpresa";
import { EmpresaListado } from "../../views/Empresas/EmpresasListado/EmpresaListado";
import { ServiceSucursal } from "../../../services/ServiceSucursal";
import { UseSucursal } from "../../views/Sucursales/useSucursal/UseSucursal";

interface IPropsListado {
  onVistaAdmin: () => void;
}

export const Listado: FC<IPropsListado> = ({onVistaAdmin}) => {
  // las empresas y sucursales
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);

  // los servicios
  const serviceEmpresa = new ServiceEmpresa();
  const serviceSucursal = new ServiceSucursal();

  // usamos el
  const [clickEmpresa, setClickEmpresa] = useState<number>(0);

  const handleChangeEmpresa = (newNumber: number) => {
    setClickEmpresa(newNumber);
  };

  useEffect(() => {
    const fetchEmpresasConSucursales = async () => {
      // Primero obtenemos todas las empresas
      const empresas = await serviceEmpresa.getAllEmpresas();

      // Luego obtenemos las sucursales para cada empresa y las añadimos al objeto `empresa`
      const empresasConSucursales = await Promise.all(
        empresas.map(async (empresa) => {
          const sucursales = await serviceSucursal.getAllSucursalesByEmpresa(
            empresa.id
          );
          return { ...empresa, sucursales };
        })
      );

      // Actualizamos el estado con las empresas que ya incluyen sus sucursales
      setEmpresas(empresasConSucursales);
    };

    fetchEmpresasConSucursales();
  }, [empresas]);

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
          {empresas.map(
          (e) =>
            clickEmpresa === e.id && (
              <UseSucursal empresa={e} onVistaAdmin={onVistaAdmin} />
            )
        )}
        </section>
      </article>
    </>
  );
};
//
