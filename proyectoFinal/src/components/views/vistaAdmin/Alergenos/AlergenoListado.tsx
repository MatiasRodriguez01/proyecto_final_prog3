import { RootState } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import { ServiceAlergenos } from "../../../../services/ServiceAlergenos";
import { FC, useEffect, useState } from "react";
import stylesAlergeno from "./Alergeno.module.css";
import { IAlergeno } from "../../../../interfaces/IAlergeno";
import { useInformacion } from "../../../../hooks/useInformacion";
import { usePopUpVisible } from "../../../../hooks/usePopUpVisible";
import { AlergenoInfo } from "./AlergenoInfo/AlergenoInfo";

interface IPropsAlergeno {
  alergenos: IAlergeno[];
  AlergenoActivo: Function;
}

export const AlergenoListado: FC<IPropsAlergeno> = ({
  alergenos,
  AlergenoActivo,
}) => {
  const { informacion, mostrarInformacion, cerrarInformacion } =
    useInformacion();
  const { isPopUpVisible, HandlePopUp } = usePopUpVisible();
  return (
    <>
      <div>
        <h2>Productos Alergenos</h2>
      </div>
      <button type="button" onClick={HandlePopUp}>
        AGREGAR ALERGENOS<span className="material-symbols-outlined">add</span>
      </button>
      <hr />
      <div>
        {alergenos.length !==0?(
          alergenos.map((a)=>(
            <div key={a.id}>
              {/* AlergenoCard */}
              {informacion === a.id && (
                                <AlergenoInfo
                                alergeno={a}
                                onVerAlergeno={cerrarInformacion}
                                />
                            )}
              </div>
                    ))
                ) : (
                    <p>No hay empresas</p>
                )}
        </div>
        
      
      
    </>
  );
};
