import { FC, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import stylesAdminCard from "./ProtectedRoutes.module.css";
import ModalCrearCategoria from "../components/views/vistaAdmin/ACategorias/ModalCrearCategoria/ModalCrearCategoria";
import ModalCrearProducto from "../components/views/vistaAdmin/AaProductos/ModalCrearProducto/ModalCrearProducto.tsx";
import ModalCrearAlergeno from "../components/views/vistaAdmin/Alergenos/ModalCrearAlergeno/ModalCrearAlergeno.tsx";

interface IProsProyectedRoutes {
  isBack: () => void;
}

export const ProtectedRoutes: FC<IProsProyectedRoutes> = ({ isBack }) => {
  const [mostrarModalCategoria, setMostrarModalCategoria] =
    useState<boolean>(false);
  const [editarCategoria, setEditarCategoria] = useState<any>(null);

  const handleAbrirModalCrearCategorias = () => {
    setEditarCategoria(null);
    setMostrarModalCategoria(true);
  };

  //cerrar el modal

  //productos
  const [mostrarModalProducto, setMostrarModalProducto] =
    useState<boolean>(false);
  const [editarProducto, setEditarProducto] = useState<any>(null);

  const handleAbrirModalCrearProductos = () => {
    setEditarProducto(null);
    setMostrarModalProducto(true);
  };

  //cerrar el modal

  //Alergenos
  const [mostrarModalAlergenos, setMostrarModalAlergenos] =
    useState<boolean>(false);
  const [editarAlergenos, setEditarAlergenos] = useState<any>(null);

  const handleMostrarCrearAlergeno = () => {
    setEditarAlergenos(null);
    setMostrarModalAlergenos(true);
  };

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
              onClick={isBack}
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
              onClick={handleMostrarCrearAlergeno}
            >
              Alergenos
            </button>
          </div>
        </div>
      </div>

      {/* componente para crear/editar categoria */}
      <ModalCrearCategoria
        show={mostrarModalCategoria}
        onClose={() => setMostrarModalCategoria(false)}
        categoria={editarCategoria}
      />

      <ModalCrearProducto
        show={mostrarModalProducto}
        onClose={() => setMostrarModalProducto(false)}
        producto={editarProducto}
      />

      <ModalCrearAlergeno
        show={mostrarModalAlergenos}
        onClose={() => setMostrarModalAlergenos(false)}
        //alergeno={editarAlergenos}
      />
    </>
  );
};
