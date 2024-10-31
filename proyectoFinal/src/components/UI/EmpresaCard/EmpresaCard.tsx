import { Button, Card } from "react-bootstrap";
import stylesEmpresaCard from "./EmpresaCard.module.css";
import { FC } from "react";

interface EmpresaCardProps {
  nombre: string;
  // razonSocial: string;
  // cuil: number;
  //imagen: string;
  onVerEmpresa: () => void;
  deleteEmpresa: () => void;
}
export const EmpresaCard: FC<EmpresaCardProps> = ({ nombre, onVerEmpresa, deleteEmpresa }) => {

  return (
    //className={stylesEmpresaCard.cardContainer}
    <Card className={stylesEmpresaCard.card}>
      {/* {imagen && (
        <Card.Img variant="top" src={imagen} alt="imagen de la empresa" />
      )} */}
      <Card.Body className={stylesEmpresaCard.bodyContainer}>
        <Card.Title style={{ height: 'auto', margin: '0' }}>{nombre}</Card.Title>
        {/* <Button variant="primary" className={stylesEmpresaCard.cardButton} onClick={onVerEmpresa}>
          <span className="material-symbols-outlined" style={{height: 'auto'}} >
            visibility
          </span>
        </Button> */}
        <div className={stylesEmpresaCard.buttonContainer}>
          <Button variant="outline-primary" className={stylesEmpresaCard.buttonCard}>
            <span className="material-symbols-outlined" onClick={onVerEmpresa} style={{ height: 'auto', textAlign: 'center' }} >
              visibility
            </span></Button>
          <Button variant="outline-danger" onClick={deleteEmpresa} className={stylesEmpresaCard.buttonCard}>
            <span className="material-symbols-outlined">
              delete_forever
            </span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EmpresaCard;