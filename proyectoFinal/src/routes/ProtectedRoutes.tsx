import { FC, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";

import { RootState } from "../store/store.ts";
import stylesAdminCard from "./ProtectedRoutes.module.css";
import ModalCrearCategoria from "../components/views/vistaAdmin/ACategorias/ModalCrearCategoria/ModalCrearCategoria.tsx";
import ModalCrearProducto from "../components/views/vistaAdmin/AaProductos/ModalCrearProducto/ModalCrearProducto.tsx";
import { Alergenos } from "../components/views/vistaAdmin/Alergenos/Alergenos.tsx";

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

  

  // empresa activa
  const empresaActica = useSelector((state: RootState) => state.empresa.empresaActiva);

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
            >
              Alergenos
            </button>
          </div>
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
        show={mostrarModalProducto}
        onClose={() => setMostrarModalProducto(false)}
        producto={editarProducto}
      />

    </>
  );
};
