import { FC } from "react";
import { IAlergenos } from "../../../../../types/dtos/alergenos/IAlergenos";
import styles from './AlergenoInfo.module.css'
import { Button } from "react-bootstrap";

interface IAlergenoInfo {
  alergeno: IAlergenos | null;
  onVerAlergeno: () => void;
}

export const AlergenoInfo: FC<IAlergenoInfo> = ({ alergeno, onVerAlergeno }) => {

  if (alergeno !== null){
    const imagen: string = alergeno.imagen.url;
    const nombre: string = alergeno.imagen.name;
  
    return (
      <div className={styles.containerPopInfo}>
        <div className={styles.container}>
          <div className="card" style={{ width: "20rem"}}>
            {alergeno.imagen && (
              <img
                src={imagen}
                alt={nombre}
                className="card-img-top"
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{alergeno.denominacion}</h5>
              <Button className="btn bton-primary" onClick={onVerAlergeno}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
