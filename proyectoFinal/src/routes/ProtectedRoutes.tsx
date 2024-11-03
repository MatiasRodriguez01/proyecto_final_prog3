import { FC } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap"

interface IProsProyectedRoutes {
  isBack: () => void;
}

export const ProtectedRoutes: FC<IProsProyectedRoutes> = ({ isBack }) => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" style={{ height: 'auto' }}>
        <Container style={{ height: 'auto' }}>
          <Navbar.Brand href="#home" style={{ height: 'auto' }}>
            <Button variant="outline-light" onClick={isBack}>
              <span className="material-symbols-outlined" style={{textAlign:'center', width:'100%'}}>arrow_back</span>
            </Button>
          </Navbar.Brand>
          <Nav style={{ height: 'auto' }} className="me-auto">
            <Nav.Link style={{ height: 'auto' }} href="#home">Home</Nav.Link>
            <Nav.Link style={{ height: 'auto' }} href="#features">Features</Nav.Link>
            <Nav.Link style={{ height: 'auto' }} href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <hr />
      <h2> hola </h2>

    </>
  )
}
