import { FC, useEffect, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import stylesAdminCard from "./ProtectedRoutes.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AlergenoListado } from "../components/views/vistaAdmin/Alergenos/AlergenoListado.tsx";
import { sucursalActiva } from "../slices/sucursalSlice.ts";
import { RootState } from "../store/store.ts";
import { Categoria } from "../components/views/vistaAdmin/ACategorias/Categoria.tsx";
import { Producto } from "../components/views/vistaAdmin/AaProductos/Producto.tsx";

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

  // mostrar la lista de alergenos
  const [listaAlergenos, setListaAlergenos ] = useState<boolean>(false);
  const handleListaAle = () => {
    setListaProductos(false);
    setListaCategoria(false);
    setListaAlergenos(!listaAlergenos);
  }

  // mostrar la lista de categoria
  const [ listaCategoria, setListaCategoria ] = useState<boolean>(false);
  const handleListaCategoria = () => {
    setListaProductos(false);
    setListaAlergenos(false);
    setListaCategoria(!listaCategoria);
  }

  // mostrar la lista de productos
  const [ listaProductos, setListaProductos ] = useState<boolean>(false);
  const handleListaProductos = () => {
    setListaCategoria(false);
    setListaAlergenos(false);
    setListaProductos(!listaProductos);
  }

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
              onClick={handleListaCategoria}
            >
              Categorias
            </button>
            <button
              className={stylesAdminCard.boton}
              type="button"
              onClick={handleListaProductos}
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
            (listaAlergenos) && <AlergenoListado/>
          }
          {
            (listaCategoria) && <Categoria/>
          }
          {
            (listaProductos) && <Producto/>
          }
        </div>
      </div>

    </>
  );
};
