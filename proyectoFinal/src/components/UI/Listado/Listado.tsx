import { useState } from "react";
import { useEmpresas } from "../../../hooks/empresas/useEmpresas";
import PopUp from "../PopUp/PopUp";
import styleListado from "./Listado.module.css";

export const Listado = () => {
  const { empresas, handleAddEmpresa } = useEmpresas();
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);

  const agregarEmpresa = () => {
    setIsPopUpVisible(true); // Muestra el modal
  };

  const cerrarPopUp = () => {
    setIsPopUpVisible(false); // Cierra el modal
  };

  const agregarNuevaEmpresa = (nombre: string) => {
    handleAddEmpresa(nombre); // Agrega la empresa al estado
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
          <div className={styleListado.titulo}>
            <h4>Lista de Empresas</h4>
          </div>
            {empresas.length !== 0 ? (
              empresas.map((e) => (
                <div className={styleListado.empresas} key={e.id}>
                  <p>{e.nombre}</p>
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
      <PopUp
        visible={isPopUpVisible}
        onClose={cerrarPopUp}
        onAddEmpresa={agregarNuevaEmpresa}
      />
    </>
  );
};
