import { Button, Card } from "react-bootstrap";
import { FC } from "react";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import stylesEmpresaCard from "./EmpresaCard.module.css";

interface EmpresaCardProps {
  empresa: IEmpresa
  onVerEmpresa: () => void
  onEmpresaActiva:() => void
}

export const EmpresaCard: FC<EmpresaCardProps> = ({ empresa, onVerEmpresa, onEmpresaActiva }) => {

  
  return (
    <>
      <Card onClick={onEmpresaActiva} className={stylesEmpresaCard.card}>
        <Card.Body className={stylesEmpresaCard.bodyContainer}>
          <Card.Title style={{ height: "auto", margin: "0" }}>
            {empresa.nombre}
          </Card.Title>
          <div className={stylesEmpresaCard.buttonContainer}>
            <Button
              variant="outline-primary"
              className={stylesEmpresaCard.buttonCard}
            >
              <span
                className="material-symbols-outlined"
                onClick={onVerEmpresa}
                style={{ height: "auto", textAlign: "center" }}
              >
                visibility
              </span>
            </Button>
            <Button
              variant="outline-danger"
              className={stylesEmpresaCard.buttonCard}
            >
              <span className="material-symbols-outlined">delete_forever</span>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default EmpresaCard;
