import { Button, Card } from "react-bootstrap";
import stylesEmpresaCard from "./EmpresaCard.module.css";
import { FC, useState } from "react";

interface EmpresaCardProps {
  nombre: string;
  // razonSocial: string;
  // cuil: number;
  //imagen: string;
  onVerEmpresa: () => void;
  deleteEmpresa: () => void;
}
export const EmpresaCard: FC<EmpresaCardProps> = ({
  nombre,
  onVerEmpresa,
  deleteEmpresa,
}) => {

  const[showSucursales, setShowSucursales] = useState(false)

  const handleClick = () => {
    setShowSucursales(true);
  };

  return (
    <>
      {/* {showSucursales ? (<div className="seccionSucursales")} */}
      <Card onClick={handleClick} className={stylesEmpresaCard.card}>
        <Card.Body className={stylesEmpresaCard.bodyContainer}>
          <Card.Title style={{ height: "auto", margin: "0" }}>
            {nombre}
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
              onClick={deleteEmpresa}
              className={stylesEmpresaCard.buttonCard}
            >
              <span className="material-symbols-outlined">delete_forever</span>
            </Button>
          </div>
        </Card.Body>
      </Card>
      {/* <div className="sucursalesExistentes">{contentSucursales && <p>{contentSucursales}</p>}</div> */}
    </>
  );
};

export default EmpresaCard;
