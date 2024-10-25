import { useState } from "react";
import { useEmpresas } from "../../../hooks/empresas/useEmpresas";
import styleListado from "./Listado.module.css";
import ModalCrearEmpresa from "../ModalCrearEmpresa/ModalCrearEmpresa";
import { EmpresaCard } from "../EmpresaCard/EmpresaCard";
export const Listado = () => {
  const { empresas, handleAddEmpresa } = useEmpresas();
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);

  const agregarEmpresa = () => {
    setIsPopUpVisible(true); // Muestra el modal
  };

  const cerrarPopUp = () => {
    setIsPopUpVisible(false); // Cierra el modal
  };

  const agregarNuevaEmpresa = (
    nombre: string,
    razonSocial: string,
    cuil: string,
    imagen: string | null
  ) => {
    handleAddEmpresa(nombre, razonSocial, cuil, imagen);
  };

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
            <h4>Lista de Empresas</h4>
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
