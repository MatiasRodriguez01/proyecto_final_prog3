import { useEmpresas } from "../../../hooks/empresas/useEmpresas";
import { EmpresaCard } from "../EmpresaCard/EmpresaCard";
import { useListado } from "../../../hooks/Listado/useListado";
import styleListado from "./Listado.module.css";
import ModalCrearEmpresa from "../ModalCrearEmpresa/ModalCrearEmpresa";

export const Listado = () => {
  const { empresas } = useEmpresas();

  const { isPopUpVisible, agregarEmpresa, cerrarPopUp, agregarNuevaEmpresa } = useListado()

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
                  />
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
