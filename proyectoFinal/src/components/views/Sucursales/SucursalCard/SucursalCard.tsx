import { FC } from "react";
import styleSucursal from "../useSucursal/UseSucursal.module.css";
import { Card, Button } from "react-bootstrap";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { usePopUpVisible } from "../../../../hooks/usePopUpVisible";
import { ModalEditarSucursal } from "../ModalEditarSucursal/ModalEditarSucursal";
import { useDispatch } from "react-redux";
import { sucursalActiva } from "../../../../slices/sucursalSlice";

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

  const dispatch = useDispatch();

  const handleAdministracion = (s: ISucursal) => {
    dispatch(sucursalActiva(s));
    onVistaAdmin();
  };

  return (
    <>
      <Card style={{ width: "18rem", height: "auto" }} className={styleSucursal.sucursalCard}>
        <Card.Header>
          <Card.Title style={{ height: "auto", textAlign: "center" }}>
            {sucursal.nombre}
          </Card.Title>
        </Card.Header>
        <Card.Body style={{ height: "auto" }}>
          <div className={styleSucursal.buttonsContainer}>
            <Button
              type="submit"
              className={styleSucursal.buttonVistaAdmin}
              onClick={() => handleAdministracion(sucursal)}
            >
              Admin
            </Button>
            <Button
              type="submit"
              className={styleSucursal.buttonVerSucursal}
              variant="primary"
            >
              Info
            </Button>
            <Button
              type="submit"
              className={styleSucursal.buttonEditarSucursal}
              variant="warning"
              onClick={HandlePopUp}
            >
              Editar
            </Button>
            <Button
              type="submit"
              className={styleSucursal.buttonEliminarSucursal}
              variant="danger"
            >
              Eliminar
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
