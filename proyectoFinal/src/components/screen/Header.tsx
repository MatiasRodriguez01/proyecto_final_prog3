import { FC } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";

interface IProsHearder {
  isBack: () => void;
}

export const Hearder: FC<IProsHearder> = ({ isBack }) => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container style={{ height: 'auto' }}>
          <Navbar.Brand href="#home">
            <Button variant="outline-light" onClick={isBack}>
              <span className="material-symbols-outlined" style={{textAlign:'center', width:'100%'}}>arrow_back</span>
            </Button>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Item>
              <Link to={'/categoria'} className="nav-link">categoria</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={'/producto'} className="nav-link">producto</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={'/alogeno'} className="nav-link">alogeno</Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
