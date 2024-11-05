import { Button, Card } from "react-bootstrap";
import { ISucursal } from "../../../interfaces/ISucursal";
import { FC } from "react";

import styleSucursal from "../useSucursal/UseSucursal.module.css";


interface IPropsSucursalCard {
  sucursal: ISucursal;
  onSucursalActiva: () => void;
  onDeleteSucursal: () => void;
}

export const SucursalCard: FC<IPropsSucursalCard> = ({ sucursal, onSucursalActiva, onDeleteSucursal }) => {
  return (
    <Card style={{ width: "18rem", height: "auto" }}>
      <Card.Body style={{ height: "auto" }}>
        <Card.Title style={{ height: "auto", textAlign: "center" }}>
          {sucursal.nombre}
        </Card.Title>
        <div className={styleSucursal.buttons}>
          <Button
            className={styleSucursal.button}
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
            className={styleSucursal.button}
            variant="danger"
            onClick={onDeleteSucursal}
          >
            <span className="material-symbols-outlined">
              delete_forever
            </span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
