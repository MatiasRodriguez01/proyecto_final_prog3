import { FC } from "react";
import { IAlergeno } from "../../../../../interfaces/IAlergeno";
import { usePopUpVisible } from "../../../../../hooks/usePopUpVisible";
import { Button, Card } from "react-bootstrap";
import { ModalEditarAlergeno } from "../ModalCrearAlergeno/ModalEditarAlergeno";

interface AlergenoCardProps {
  alergeno: IAlergeno;
  onVerAlergeno: () => void;
  onAlergenoActivo: Function;
}

export const AlergenoCard: FC<AlergenoCardProps> = ({
  alergeno,
  onVerAlergeno,
  onAlergenoActivo,
}) => {
  const { isPopUpVisible, HandlePopUp } = usePopUpVisible();
  return (
    <>
      <Card onClick={() => onAlergenoActivo(alergeno.id)}>
        <Card.Body>
          <Card.Title>{alergeno.denominacion}</Card.Title>
          <div>
            <Button variant="outline-primary" onClick={onVerAlergeno}>
              {" "}
              <span
                className="material-symbols-outlined"
                style={{ width: "auto", height: "auto", textAlign: "center" }}
              >
                visibility
              </span>
            </Button>
            <Button variant="outline-danger">
              <span
                style={{ width: "auto", height: "auto", textAlign: "center" }}
                className="material-symbols-outlined"
              >
                delete_forever
              </span>
            </Button>
            <Button variant="outline-success" onClick={HandlePopUp}>
              <span className="material-symbols-outlined">edit</span>
            </Button>
          </div>
        </Card.Body>
      </Card>

      <ModalEditarAlergeno alergeno={alergeno} visible={isPopUpVisible} onClose={HandlePopUp}/>
    </>
  );
};
