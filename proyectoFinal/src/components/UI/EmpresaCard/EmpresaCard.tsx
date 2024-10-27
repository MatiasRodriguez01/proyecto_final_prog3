import { Button, Card } from "react-bootstrap";
import stylesEmpresaCard from "./EmpresaCard.module.css";
import { FC } from "react";

interface EmpresaCardProps {
  nombre: string;
  razonSocial: string;
  cuil: string;
  imagen: string | null;
  onVerEmpresa: () => void;
}
export const EmpresaCard: FC<EmpresaCardProps> = ({ nombre, imagen, onVerEmpresa}) => {

  return (
    //className={stylesEmpresaCard.cardContainer}
    <Card> 
      {imagen && (
        <Card.Img variant="top" src={imagen} alt="imagen de la empresa" />
      )}
      <Card.Body className={stylesEmpresaCard.bodyContainer}>
        <Card.Title style={{height:'auto', margin:'0'}}>{nombre}</Card.Title>
        <Button variant="primary" className={stylesEmpresaCard.cardButton} onClick={onVerEmpresa}>
          Ver Empresa
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EmpresaCard;
