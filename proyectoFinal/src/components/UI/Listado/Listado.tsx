import { EmpresaCard } from "../EmpresaCard/EmpresaCard";
import { useListado } from "../../../hooks/Listado/useListado";
import { EmpresaInfo } from "../EmpresaInfo/EmpresaInfo";
import { useEmpresaActiva } from "../../../hooks/useEmpresaActiva/useEmpresaActiva";

import ModalCrearEmpresa from "../ModalCrearEmpresa/ModalCrearEmpresa";
import styleListado from "./Listado.module.css";
import { useEmpresas } from "../../../hooks/empresas/useEmpresas";
import { IEmpresa } from "../../../interfaces/IEmpresa";
import { useState } from "react";
import { ModalCrearSucursal } from "../ModalCrearSucursal/ModalCrearSucursal";
import { useSucursales } from "../../../hooks/sucursales/useSucursales";


export const Listado = () => {
  // const x: string[][] = empresas.map((e) => e.sucursales)
  const { empresas, handleAddEmpresa, handleDeleteEmpresa } = useEmpresas();

  const {sucursales, handleAddSucursal, handleDeleteSucursal} = useSucursales();


  const {
    isPopUpVisible,
    HandlePopUp,
    agregarNuevaEmpresa
  } = useListado(handleAddEmpresa, handleAddSucursal)

  
  const { empresaActiva, mostrarEmpresaInfo, cerrarEmpresaInfo } = useEmpresaActiva()

  const [listadoEmpresasActivas, setEmpresasActivas] = useState<IEmpresa[]>([])

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
          >AGREGAR EMPRESAS<span className="material-symbols-outlined ">add</span>
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
                    nombre={e.nombre}
                    onVerEmpresa={() => mostrarEmpresaInfo(e.id)} // Usar la función para mostrar EmpresaInfo
                    deleteEmpresa={() => handleDeleteEmpresa(e.id)}
                  />

                  {empresaActiva == e.id && (
                    <EmpresaInfo
                      nombre={e.nombre}
                      razonSocial={e.razonSocial}
                      cuil={e.cuil}
                      imagen={e.imagen}
                      onVerEmpresa={cerrarEmpresaInfo}
                    />

                  )}

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
          <div className={styleListado.sucursalContainer}>
            {
              empresas.map((empresa) => {
                return (<p>{empresa.sucursales}</p>)
              })
            }
          </div>
        </section>
        {/* Componente para mostrar la información de la empresa */}
      </article>

      {/* Componente PopUp */}
      <ModalCrearEmpresa
        visible={isPopUpVisible}
        onClose={HandlePopUp}
        onAddEmpresa={agregarNuevaEmpresa}
      />
    </>
  );
};