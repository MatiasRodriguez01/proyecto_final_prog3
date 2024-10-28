import { EmpresaCard } from "../EmpresaCard/EmpresaCard";
import { useListado } from "../../../hooks/Listado/useListado";
import { EmpresaInfo } from "../EmpresaInfo/EmpresaInfo";
import { useEmpresaActiva } from "../../../hooks/useEmpresaActiva/useEmpresaActiva";

import ModalCrearEmpresa from "../ModalCrearEmpresa/ModalCrearEmpresa";
import styleListado from "./Listado.module.css";
import { useEmpresas } from "../../../hooks/empresas/useEmpresas";


export const Listado = () => {

  const {empresas, handleAddEmpresa} = useEmpresas();

  const {
    isPopUpVisible,
    agregarEmpresa,
    cerrarPopUp,
    agregarNuevaEmpresa
  } = useListado({ voidEmpresa: handleAddEmpresa })

  const { empresaActiva, mostrarEmpresaInfo, cerrarEmpresaInfo } = useEmpresaActiva()

  return (
    <>
      <article className={styleListado.container}>
        <section className={styleListado.containerEmpresas}>
          <div className={styleListado.titulo}>
            <h2>Empresas</h2>
          </div>
          <button
            type="button"
            onClick={agregarEmpresa}
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
                    nombre={e.nombre}
                    razonSocial={e.razonSocial}
                    cuil={e.cuil}
                    imagen={e.imagen}
                    onVerEmpresa={() => mostrarEmpresaInfo(e.id)} // Usar la función para mostrar EmpresaInfo
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
          {/* <button>AGREGAR SUCURSAL</button> */}
        </section>
        {/* Componente para mostrar la información de la empresa */}
      </article>




      {/* Componente PopUp */}
      <ModalCrearEmpresa
        visible={isPopUpVisible}
        onClose={cerrarPopUp}
        onAddEmpresa={agregarNuevaEmpresa}
      />
    </>
  );
};