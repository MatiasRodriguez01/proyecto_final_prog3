import { FC } from "react";
import styleSucursal from "../useSucursal/UseSucursal.module.css";
import { Card, Button } from "react-bootstrap";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";


interface IPropsSucursalCard {
  sucursal: ISucursal;
  onSucursalActiva: () => void;
}

export const SucursalCard: FC<IPropsSucursalCard> = ({ sucursal, onSucursalActiva }) => {
  return (
    <Card style={{ width: "18rem", height: "auto" }}>
      <Card.Body style={{ height: "auto" }}>
        <Card.Title style={{ height: "auto", textAlign: "center" }}>
          {sucursal.nombre}
        </Card.Title>
        <div className={styleSucursal.buttons}>
          <Button
            type='submit'
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
            type='submit'
            className={styleSucursal.button}
            variant="danger"
          >
            <span className="material-symbols-outlined">
              delete_forever
            </span>
          </Button>
          <Button
            type='submit'
            className={styleSucursal.button}
            variant="warning"
          >ver</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
