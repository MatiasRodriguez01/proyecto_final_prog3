import { Button, Card } from "react-bootstrap";
import { FC } from "react";
import { IEmpresa } from "../../../../interfaces/IEmpresa";
import stylesEmpresaCard from "./EmpresaCard.module.css";

interface EmpresaCardProps {
  empresa: IEmpresa;
  // razonSocial: string;
  // cuil: number;
  //imagen: string;
  onVerEmpresa: () => void;
  deleteEmpresa: () => void;
  onClick: () => void;
}

export const EmpresaCard: FC<EmpresaCardProps> = ({ empresa, onVerEmpresa, deleteEmpresa, onClick }) => {

  //const[showSucursales, setShowSucursales] = useState(false)
  return (
    <>
      {/* {showSucursales ? (<div className="seccionSucursales")} */}
      <Card onClick={onClick} className={stylesEmpresaCard.card}>
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
