import { Button, Card } from "react-bootstrap";
import stylesEmpresaCard from "./EmpresaCard.module.css";
import { FC } from "react";

interface EmpresaCardProps {
  nombre: string;
  razonSocial: string;
  cuil: string;
  imagen: string | null;
}
export const EmpresaCard: FC<EmpresaCardProps> = ({ nombre, imagen }) => {
  return (
    <Card className={stylesEmpresaCard.cardContainer}>
      {imagen && (
        <Card.Img variant="top" src={imagen} alt="imagen de la empresa" />
      )}
      <Card.Body className={stylesEmpresaCard.bodyContainer}>
        <Card.Title>{nombre}</Card.Title>
        <Button variant="primary" className={stylesEmpresaCard.cardButton}>
          Ver Empresa
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EmpresaCard;
