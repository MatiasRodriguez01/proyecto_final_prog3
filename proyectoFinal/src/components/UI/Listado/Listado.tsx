import { EmpresaCard } from "../EmpresaCard/EmpresaCard";
import { useListado } from "../../../hooks/Listado/useListado";
import { EmpresaInfo } from "../EmpresaInfo/EmpresaInfo";
import { useEmpresas } from "../../../hooks/empresas/useEmpresas";
import { useState } from "react"
import { UseSucursal } from "../useSucursal/UseSucursal";

import ModalCrearEmpresa from "../ModalCrearEmpresa/ModalCrearEmpresa";
import styleListado from '../Listado/Listado.module.css'
import { useSucursales } from "../../../hooks/sucursales/useSucursales";
import { useInformacion } from "../../../hooks/useInformacion/useInformacion";
//import { useEmpresas } from "../../../hooks/empresas/useEmpresas";


export const Listado = () => {
  // const x: string[][] = empresas.map((e) => e.sucursales)
  const { empresas, handleAddEmpresa, handleDeleteEmpresa } = useEmpresas();

  const { sucursales, handleAddSucursal, handleDeleteSucursal } = useSucursales()

  const {
    isPopUpVisible,
    HandlePopUp,
    agregarNuevaEmpresa,
    agregarNuevaSucursal
  } = useListado(handleAddEmpresa, handleAddSucursal)

  const {informacion,mostrarInformacion,cerrarInformacion } = useInformacion()

  const [empresaActiva, setEmpresaActiva] = useState<string>('')

  const handleEmpresaActiva = (id: string) => {
    setEmpresaActiva(id)
  }


  //const [listadoEmpresasActivas, setEmpresasActivas] = useState<IEmpresa[]>([])

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
                    empresa={e}
                    onVerEmpresa={() => mostrarInformacion(e.id)} // Usar la función para mostrar EmpresaInfo
                    deleteEmpresa={() => handleDeleteEmpresa(e.id)}
                    onClick={() => handleEmpresaActiva(e.id)}

                  />

                  {informacion == e.id && (
                    <EmpresaInfo
                      nombre={e.nombre}
                      razonSocial={e.razonSocial}
                      cuil={e.cuil}
                      imagen={e.imagen}
                      onVerEmpresa={cerrarInformacion}
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
              empresas.map((empresa) => (
                <UseSucursal 
                  empresa={empresa} 
                  empresaActiva={empresaActiva} 
                  prop_sucursales={sucursales} 
                  onAddSucursal={agregarNuevaSucursal} 
                  onDeleteSucursal={handleDeleteSucursal}
                  />
              ))
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