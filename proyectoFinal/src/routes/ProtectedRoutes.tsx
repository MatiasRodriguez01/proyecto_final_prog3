import { FC, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import stylesAdminCard from "./ProtectedRoutes.module.css";
import ModalCrearCategoria from "../components/views/ACategorias/ModalCrearCategoria/ModalCrearCategoria";
import ModalCrearProducto from "../components/views/AaProductos/ModalCrearProducto/ModalCrearProducto";
import ModalCrearAlergeno from "../components/views/Alergenos/ModalCrearAlergeno/ModalCrearAlergeno";

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

  const [editarAlergeno, setEditarAlergeno] = useState<any>(null);

  const handleAbrirModalCrearAlergeno = () => {
    setEditarAlergeno(null);
    setMostrarModalAlergeno(true);
  };

  //cerrar el modal
  const handleGuardarAlergeno = () => {
    setMostrarModalProducto(false);
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ height: "auto" }}>
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
          <h3>Administracion</h3>
          <div className={stylesAdminCard.containerBotones}>
            <button type="button" onClick={handleAbrirModalCrearCategorias}>
              Categorias
            </button>

            <button type="button" onClick={handleAbrirModalCrearProductos}>
              Productos
            </button>

            <button type="button" onClick={handleAbrirModalCrearAlergeno}>
              Alergenos
            </button>
          </div>
        </div>
      </div>

      {/* componente para crear/editar categoria */}
      <div>
        <ModalCrearCategoria
          show={mostrarModalCategoria}
          onClose={() => setMostrarModalCategoria(false)}
          categoria={editarCategoria}
        />
      </div>

      {/* componente para crear/editar productos */}
      <div>
        <ModalCrearProducto
          visible={mostrarModalProducto}
          onClose={() => setMostrarModalProducto(false)}
          producto={editarProducto}
        />
      </div>
      {/* componente para crear/editar alergenos */}
      <div>
        <ModalCrearAlergeno
          show={mostrarModalAlergeno}
          onClose={() => setMostrarModalAlergeno(false)}
        />
      </div>
    </>
  );
};
