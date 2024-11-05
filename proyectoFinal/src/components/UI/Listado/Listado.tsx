import { FC, useState } from "react";
import { useEmpresas } from "../../../hooks/useEmpresas";
import { useInformacion } from "../../../hooks/useInformacion";
import { useListado } from "../../../hooks/useListado";
import { useSucursales } from "../../../hooks/useSucursales";
import { EmpresaInfo } from "../Empresas/EmpresaInfo/EmpresaInfo";
import { UseSucursal } from "../Sucursales/useSucursal/UseSucursal";

import ModalCrearEmpresa from "../Empresas/ModalCrearEmpresa/ModalCrearEmpresa";
import EmpresaCard from "../Empresas/EmpresaCard/EmpresaCard";

import styleListado from "./Listado.module.css";

interface IProsListado {
  isLoggin: () => void;
}

export const Listado: FC<IProsListado> = ({ isLoggin }) => {
  const { empresas, handleAddEmpresa, handleDeleteEmpresa } = useEmpresas();

  const { sucursales, handleAddSucursal, handleDeleteSucursal } =
    useSucursales();


  const {
    isPopUpVisible,
    HandlePopUp,
    agregarNuevaEmpresa,
    agregarNuevaSucursal,
<<<<<<< HEAD

  } = useListado(handleAddEmpresa, handleAddSucursal)
=======
  } = useListado(handleAddEmpresa, handleAddSucursal);
>>>>>>> cb614be81b80da9b56492700db529fc9aa8ca07a

  const { informacion, mostrarInformacion, cerrarInformacion } =
    useInformacion();

  const [empresaActiva, setEmpresaActiva] = useState<string>("");

  const handleEmpresaActiva = (id: string) => {
    setEmpresaActiva(id);
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
            {empresas.map((empresa) => (
              <UseSucursal
                key={empresa.id}
                empresa={empresa}
                empresaActiva={empresaActiva}
                prop_sucursales={sucursales}
                onAddSucursal={agregarNuevaSucursal}
                onDeleteSucursal={handleDeleteSucursal}
                isLoggin={isLoggin}
              />
            ))}
          </div>
        </section>
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
