import { FC, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import stylesAdminCard from "./ProtectedRoutes.module.css";
import { usePopUpVisible } from "../hooks/usePopUpVisible";
import ModalCrearCategoria from "../components/views/vistaAdmin/ACategorias/ModalCrearCategoria/ModalCrearCategoria";
import ModalCrearProducto from "../components/views/vistaAdmin/AaProductos/ModalCrearProducto/ModalCrearProducto.tsx";
import ModalCrearAlergeno from "../components/views/vistaAdmin/Alergenos/ModalCrearAlergeno/ModalCrearAlergeno.tsx";

interface IProsProyectedRoutes {
  isBack: () => void;
}

export const ProtectedRoutes: FC<IProsProyectedRoutes> = ({ isBack }) => {
  const { isPopUpVisible, HandlePopUp } = usePopUpVisible();

  const [mostrarModalCategoria, setMostrarModalCategoria] =
    useState<boolean>(false);
  const [editarCategoria, setEditarCategoria] = useState<any>(null);

  const handleAbrirModalCrearCategorias = () => {
    setEditarCategoria(null);
    setMostrarModalCategoria(true);
  };

  //cerrar el modal
  const handleGuardarCategoria = () => {
    setMostrarModalCategoria(false);
  };
  //productos
  const [mostrarModalProducto, setMostrarModalProducto] =
    useState<boolean>(false);
  const [editarProducto, setEditarProducto] = useState<any>(null);

  const handleAbrirModalCrearProductos = () => {
    setEditarProducto(null);
    setMostrarModalProducto(true);
  };

  //cerrar el modal
  const handleGuardarProducto = () => {
    setMostrarModalProducto(false);
  };

  //Alergenos
  const [mostrarModalAlergeno, setMostrarModalAlergeno] = useState<boolean>(false);

  return (
    <>
      <Navbar
        bg="primary"
        data-bs-theme="dark"
        style={{ height: "auto" }}
        className={stylesAdminCard.navBar}
      >
        <Container style={{ height: "auto" }}>
          <Navbar.Brand href="#home" style={{ height: "auto" }}>
            <Button variant="outline-light" onClick={isBack}>
              <span
                className="material-symbols-outlined"
                style={{ textAlign: "center", width: "100%" }}
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
              onClick={HandlePopUp}
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
        show={isPopUpVisible}
        onClose={HandlePopUp}
      />
    </>
  );
};
