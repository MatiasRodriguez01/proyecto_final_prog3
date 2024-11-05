import { Button, Card } from "react-bootstrap";
import { FC } from "react";
import { IEmpresa } from "../../../../interfaces/IEmpresa";
import stylesEmpresaCard from "./EmpresaCard.module.css";

interface EmpresaCardProps {
  empresa: IEmpresa;
  onVerEmpresa: () => void;
  deleteEmpresa: () => void;
  onClick: () => void;
}

export const EmpresaCard: FC<EmpresaCardProps> = ({
  empresa,
  onVerEmpresa,
  deleteEmpresa,
  onClick,
}) => {
  return (
    <>
      <Card onClick={onClick} className={stylesEmpresaCard.card}>
        <Card.Body className={stylesEmpresaCard.bodyContainer}>
          <Card.Title style={{ height: "auto", margin: "0" }}>
            {empresa.nombre}
          </Card.Title>
          <img
            src={empresa.imagen}
            alt={`${empresa.nombre} logo`}
            style={{
              width: "100%",
              height: "auto",
              marginTop: "10px",
            }}
          />
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
              onClick={deleteEmpresa}
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
