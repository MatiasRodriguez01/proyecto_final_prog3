import { FC } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import stylesHeader from "./Header.module.css";

interface IProsHearder {
  isBack: () => void;
}

export const Hearder: FC<IProsHearder> = ({ isBack }) => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container style={{ height: "auto" }}>
          <Navbar.Brand href="#home">
            <Button onClick={isBack} className={stylesHeader.backButton}>
              <span
                className="material-symbols-outlined"
                style={{ textAlign: "center", width: "100%" }}
              >
                arrow_back
              </span>
            </Button>
          </Navbar.Brand>
          <Nav className="justify-content-end gap-2">
            <Nav.Item>
              <Link to={"/categoria"} className="nav-link">
                Categorias
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={"/producto"} className="nav-link">
                Productos
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={"/alogeno"} className="nav-link">
                Alergenos
              </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
