import { FC, useEffect, useState } from "react";

import { ServiceEmpresa } from "../../../services/ServiceEmpresa";
import { EmpresaListado } from "../../views/Empresas/EmpresasListado/EmpresaListado";
import { ServiceSucursal } from "../../../services/ServiceSucursal";
import { UseSucursal } from "../../views/Sucursales/useSucursal/UseSucursal";
import { useDispatch, useSelector } from "react-redux";
import { setEmpresas } from "../../../slices/empresaSlice";

import styleListado from './Listado.module.css'
import { RootState } from "../../../store/store";

interface IPropsListado {
  onVistaAdmin: () => void;
}

export const Listado: FC<IPropsListado> = ({onVistaAdmin}) => {
  
   // Usamos dispatch para enviar acciones a Redux
   const dispatch = useDispatch();

   // Obtenemos las empresas del store usando useSelector
   const empresas = useSelector((state: RootState) => state.empresa.empresas);  

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
      try {
        // Primero obtenemos todas las empresas
        const empresas = await serviceEmpresa.getAllEmpresas();

        // Luego obtenemos las sucursales para cada empresa y las añadimos al objeto `empresa`
        const empresasConSucursales = await Promise.all(
          empresas.map(async (empresa) => {
            const sucursales = await serviceSucursal.getAllSucursalesByEmpresa(empresa.id);
            return { ...empresa, sucursales };
          })
        );

        // Actualizamos el estado de empresas en Redux
        dispatch(setEmpresas(empresasConSucursales));
      } catch (error) {
        console.error("Error al obtener las empresas con sucursales:", error);
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
              <UseSucursal empresa={e} onVistaAdmin={onVistaAdmin} />
            )
        )}
        </section>
      </article>
    </>
  );
};
//
