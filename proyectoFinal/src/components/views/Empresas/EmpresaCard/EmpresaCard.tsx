import { Button, Card } from "react-bootstrap";
import { FC } from "react";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import stylesEmpresaCard from "./EmpresaCard.module.css";
import { ModalEditarEmpresa } from "../ModalEditarEmpresa/ModalEditarEmpresa";
import { usePopUpVisible } from "../../../../hooks/usePopUpVisible";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { empresaActiva, eliminarEmpresaActiva } from "../../../../slices/empresaSlice";

interface EmpresaCardProps {
  empresa: IEmpresa
  onVerEmpresa: () => void
  onEmpresaActiva: Function
}

export const EmpresaCard: FC<EmpresaCardProps> = ({ empresa, onVerEmpresa, onEmpresaActiva }) => {

  const dispatch = useDispatch();

  const { isPopUpVisible, HandlePopUp } = usePopUpVisible();

  const ea = useSelector((state: RootState) => state.empresa.empresaActiva)

  const handleEmpresaActiva = () => {
    dispatch(eliminarEmpresaActiva())
    dispatch(empresaActiva(empresa))
    onEmpresaActiva(empresa.id)
    console.log(ea)
  }

  return (
    <>
      <Card onClick={handleEmpresaActiva} className={stylesEmpresaCard.card}>
        <Card.Body className={stylesEmpresaCard.bodyContainer}>
          <Card.Title style={{ height: "auto", margin: "0" }}>
            {empresa.nombre}
          </Card.Title>
          <div className={stylesEmpresaCard.buttonContainer}>
            <Button
              variant="outline-primary"
              className={stylesEmpresaCard.buttonCard}
              onClick={onVerEmpresa}
            >
              <span
                className="material-symbols-outlined"
                style={{ width: 'auto', height: "auto", textAlign: "center" }}
              >
                visibility
              </span>
            </Button>
            <Button
              variant="outline-danger"
              className={stylesEmpresaCard.buttonCard}
            >
              <span style={{ width: 'auto', height: "auto", textAlign: "center" }} className="material-symbols-outlined">delete_forever</span>
            </Button>
            <Button
              variant="outline-success"
              className={stylesEmpresaCard.buttonCard}
              onClick={HandlePopUp}>
              <span className="material-symbols-outlined">
                edit
              </span>
            </Button>
          </div>
        </Card.Body>
      </Card>

      <ModalEditarEmpresa empresa={empresa} visible={isPopUpVisible} onClose={HandlePopUp} />
    </>
  );
};

export default EmpresaCard;
