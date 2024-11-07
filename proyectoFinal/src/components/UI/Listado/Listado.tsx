import { FC, useEffect, useState } from "react";
import { useEmpresas } from "../../../hooks/useEmpresas";
import { useInformacion } from "../../../hooks/useInformacion";
import { useListado } from "../../../hooks/useListado";

import ModalCrearEmpresa from "../../views/Empresas/ModalCrearEmpresa/ModalCrearEmpresa";
import EmpresaCard from "../../views/Empresas/EmpresaCard/EmpresaCard";

import styleListado from "./Listado.module.css";
import { EmpresaInfo } from "../../views/Empresas/EmpresaInfo/EmpresaInfo";

// interface IProsListado {
//   isLoggin: () => void;
// }

export const Listado = () => {
  // const x: string[][] = empresas.map((e) => e.sucursales)
  const { empresas, handleAddEmpresa, handleDeleteEmpresa } = useEmpresas();

  //const { sucursales, handleAddSucursal, handleUpdateSucursal } = useSucursales(0);

  const { isPopUpVisible, HandlePopUp } = useListado()

  const { informacion, mostrarInformacion, cerrarInformacion } = useInformacion()

  const [empresaActiva, setEmpresaActiva] = useState<number | null>(null)

  const handleEmpresaActiva = (id: number) => {
    setEmpresaActiva(id)
  }

  return (
    <>
      <article className={styleListado.container}>
        <section className={styleListado.containerEmpresas}>
          <div className={styleListado.titulo}>
            <h2>Empresas</h2>
          </div>
          <button
            type="button"
            onClick={HandlePopUp}
            className={styleListado.agregarEmpresa}
          >
            AGREGAR EMPRESAS
            <span className="material-symbols-outlined ">add</span>
          </button>
          <hr />
          <div className={styleListado.listaEmpresa}>
            <div className={styleListado.titulo}>
              <h4>Lista de Empresas</h4>
            </div>
            {empresas.length !== 0 ? (
              empresas.map((e) => (
                <div className={styleListado.empresasCardContainer} key={e.id}>
                  {/* Tarjeta de EMPRESA CARD */}

                  <EmpresaCard
                    empresa={e}
                    // Usar la función para mostrar EmpresaInfo
                    onVerEmpresa={() => mostrarInformacion(e.id)}
                    // Usar la funcion para eliminar una empresa
                    deleteEmpresa={() => handleDeleteEmpresa(e.id)}
                    onClick={() => handleEmpresaActiva(e.id)}
                  />

                  {informacion == e.id && (
                    <EmpresaInfo
                      empresa={e}
                      onVerEmpresa={cerrarInformacion}
                    />
                  )}

                  {/* Componente PopUp */}

                </div>
              ))
            ) : (
              <p>No hay empresas</p>
            )}
          </div>
        </section>

        <section className={styleListado.containerSucursales}>
          <div className={styleListado.titulo}>
            <h2>Sucursales</h2>
          </div>
          {/* <div className={styleListado.sucursalContainer}>
            {
              empresas.map((empresa) => (
                <UseSucursal 
                  key={empresa.id}
                  empresa={empresa} 
                  empresaActiva={empresaActiva} 
                  prop_sucursales={sucursales} 
                  onAddSucursal={agregarNuevaSucursal} 
                  onDeleteSucursal={handleDeleteSucursal}
                  isLoggin={isLoggin}
                  />
              ))
            }
          </div> */}

        </section>

      </article>

      <ModalCrearEmpresa
        visible={isPopUpVisible}
        onClose={HandlePopUp}
        onAddEmpresa={handleAddEmpresa}
      />
    </>
  );
};
