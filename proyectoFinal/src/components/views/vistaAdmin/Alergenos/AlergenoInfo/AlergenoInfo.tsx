import { FC } from "react";
import { IAlergenos } from "../../../../../types/dtos/alergenos/IAlergenos";

interface IAlergenoInfo {
  alergeno: IAlergenos;
  onVerAlergeno: () => void;
}

export const AlergenoInfo: FC<IAlergenoInfo> = ({ alergeno, onVerAlergeno }) => {

  const imagen: string = alergeno.imagen.url;
  const nombre: string = alergeno.imagen.name;

  return (
    <div>
      <div>
        <div>
          {alergeno.imagen && (
            <img
              src={imagen}
              alt={nombre}
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
