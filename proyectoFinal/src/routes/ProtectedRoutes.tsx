import { FC } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import stylesAdminCard from "./ProtectedRoutes.module.css";
import { usePopUpVisible } from "../hooks/usePopUpVisible";

interface IProsProyectedRoutes {
  isBack: () => void;
}

export const ProtectedRoutes: FC<IProsProyectedRoutes> = ({ isBack }) => {

  const {
    isPopUpVisible,
    HandlePopUp
  } = usePopUpVisible()

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" style={{ height: "auto" }}>
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
            <button 
            type="button"
            onClick={HandlePopUp}
            >Categorias</button>

            <button 
            type="button"
            onClick={HandlePopUp}
            >Productos</button>

            <button 
            type="button"
            onClick={HandlePopUp}
            >Alergenos</button>

          </div>
        </div>
      </div>
    </>
  );
};
