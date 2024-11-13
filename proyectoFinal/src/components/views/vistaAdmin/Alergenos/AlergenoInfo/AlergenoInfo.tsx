import { FC } from "react";
import { IAlergeno } from "../../../../../interfaces/IAlergeno";

interface IAlergenoInfo {
  alergeno: IAlergeno;
  onVerAlergeno: () => void;
}

export const AlergenoInfo: FC<IAlergenoInfo> = ({
  alergeno,
  onVerAlergeno,
}) => {
  return (
    <div>
      <div>
        <div>
          {alergeno.imagen && (
            <img
              src={alergeno.imagen}
              alt="Imagen del alergeno"
              className="card-img-top"
            />
          )}
          <div className="card-body">
            <h5 className="card-title">{alergeno.denominacion}</h5>
            <button className="btn bton-primary" onClick={onVerAlergeno}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
