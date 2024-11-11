import { FC } from "react";
import styleSucursal from "../useSucursal/UseSucursal.module.css";
import { Card, Button } from "react-bootstrap";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { usePopUpVisible } from "../../../../hooks/usePopUpVisible";
import { ModalEditarSucursal } from "../ModalEditarSucursal/ModalEditarSucursal";

interface IPropsSucursalCard {
  sucursal: ISucursal;
  idEmpresa: number;
  onSucursalActiva: () => void;
  onVistaAdmin: () => void;
}

export const SucursalCard: FC<IPropsSucursalCard> = ({
  sucursal,
  idEmpresa,
  onSucursalActiva,
  onVistaAdmin,
}) => {
  const { isPopUpVisible, HandlePopUp } = usePopUpVisible();

  return (
    <>
      <Card style={{ width: "18rem", height: "auto" }}>
        <Card.Body style={{ height: "auto" }}>
          <Card.Title style={{ height: "auto", textAlign: "center" }}>
            {sucursal.nombre}
          </Card.Title>
          <div className={styleSucursal.buttonsContainer}>
            <Button
              type="submit"
              className={styleSucursal.buttonVerSucursal}
              variant="primary"
            >
              <span
                className="material-symbols-outlined"
                style={{ height: "auto", textAlign: "center" }}
                onClick={onSucursalActiva}
              >
                visibility
              </span>
            </Button>{" "}
            <Button
              type="submit"
              className={styleSucursal.buttonEliminarSucursal}
              variant="danger"
            >
              <span className="material-symbols-outlined">delete_forever</span>
            </Button>
            <Button
              type="submit"
              className={styleSucursal.buttonEditarSucursal}
              variant="warning"
              onClick={HandlePopUp}
            >
              <span className="material-symbols-outlined">edit</span>
            </Button>
            <Button
              type="submit"
              className={styleSucursal.buttonVistaAdmin}
              onClick={onVistaAdmin}
            >
              <span className="material-symbols-outlined">shield_person</span>
            </Button>
          </div>
        </Card.Body>
      </Card>

      <ModalEditarSucursal
        sucursal={sucursal}
        id={idEmpresa}
        visible={isPopUpVisible}
        onClose={HandlePopUp}
      />
    </>
  );
};
