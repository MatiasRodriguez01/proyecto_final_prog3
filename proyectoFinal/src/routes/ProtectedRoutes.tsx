import { FC, useEffect, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import stylesAdminCard from "./ProtectedRoutes.module.css";
import ModalCrearCategoria from "../components/views/vistaAdmin/ACategorias/ModalCrearCategoria/ModalCrearCategoria.tsx";
import ModalCrearProducto from "../components/views/vistaAdmin/AaProductos/ModalCrearProducto/ModalCrearProducto.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import { AlergenoListado } from "../components/views/vistaAdmin/Alergenos/AlergenoListado.tsx";
import { sucursalActiva } from "../slices/sucursalSlice.ts";

interface IProsProyectedRoutes {
  isBack: () => void;
}

export const ProtectedRoutes: FC<IProsProyectedRoutes> = ({ isBack }) => {

  // dispatch
  const dispatch = useDispatch();

  // sucursal
  const sucursal = useSelector((state: RootState) => state.sucursal.sucursalActiva);

  useEffect(() => {
    console.log("sucursal Activa: ", sucursal)
  }, [sucursal]);

  // volver a las routes
  const handleBack = () => {
    dispatch(sucursalActiva(null))
    isBack()
  }

  // mostrar el modal de categoria
  const [mostrarModalCategoria, setMostrarModalCategoria] = useState<boolean>(false);

  // const de editar categoria
  const [editarCategoria, setEditarCategoria] = useState<any>(null);

  // funcion para abrir del modal
  const handleAbrirModalCrearCategorias = () => {
    setEditarCategoria(null);
    setMostrarModalCategoria(true);
  };

  //cerrar el modal

  // funcion para mostrar el modal
  const [mostrarModalProducto, setMostrarModalProducto] = useState<boolean>(false);

  // editar el producto
  const [editarProducto, setEditarProducto] = useState<any>(null);

  // const de mostrar el modal de productos
  const handleAbrirModalCrearProductos = () => {
    setEditarProducto(null);
    setMostrarModalProducto(true);
  };

  // mostrar la lista de alergenos
  const [listaAlergenos, setListaAlergenos ] = useState<boolean>(false);

  const handleListaAle = () => {
    setListaAlergenos(!listaAlergenos);
  }

  // empresa activa
  const empresaActica = useSelector((state: RootState) => state.empresa.empresaActiva);

  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        className={stylesAdminCard.navBar}
      >
        <Container className={stylesAdminCard.navBarContainer}>
          <Navbar.Brand href="#home">
            <Button
              variant="outline-light"
              onClick={handleBack}
              className={stylesAdminCard.brandButton}
            >
              <span
                className={`material-symbols-outlined ${stylesAdminCard.materialIcon}`}
              >
                arrow_back
              </span>
            </Button>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className={stylesAdminCard.container}>
        <div className={stylesAdminCard.administracion}>
          <div className={stylesAdminCard.containerBotones}>
            <h3>Administracion</h3>
            <button
              className={stylesAdminCard.boton}
              type="button"
              onClick={handleAbrirModalCrearCategorias}
            >
              Categorias
            </button>
            <button
              className={stylesAdminCard.boton}
              type="button"
              onClick={handleAbrirModalCrearProductos}
            >
              Productos
            </button>
            <button
              className={stylesAdminCard.boton}
              type="button"
              onClick={handleListaAle}
            >
              Alergenos
            </button>
          </div>
        </div>
        <div className={stylesAdminCard.contenido}>
          {/* mostramos el listado */}
          { 
            (listaAlergenos === true) && <AlergenoListado/>
          }
        </div>
      </div>

      

      {/* componente para crear/editar categoria */}
      <ModalCrearCategoria
        empresa={empresaActica}
        show={mostrarModalCategoria}
        onClose={() => setMostrarModalCategoria(false)}
        categoria={editarCategoria}
      />

      <ModalCrearProducto
        sucursal={sucursal}
        categoria={editarCategoria}
        show={mostrarModalProducto}
        onClose={() => setMostrarModalProducto(false)}
        producto={editarProducto}
      />

    </>
  );
};
