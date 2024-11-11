import { Button } from "react-bootstrap";
import { FC, useState, useEffect } from "react";

import { SucursalCard } from "../SucursalCard/SucursalCard";
import { Sucursalnfo } from "../sucursalnfo/Sucursalnfo";
import { ModalCrearSucursal } from "../ModalCrearSucursal/ModalCrearSucursal";

import styleSucursal from "../useSucursal/UseSucursal.module.css";
import { useInformacion } from "../../../../hooks/useInformacion";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { usePopUpVisible } from "../../../../hooks/usePopUpVisible";

interface IPropsSucursal {
  empresa: IEmpresa;
  onVistaAdmin: () => void;
}

export const UseSucursal: FC<IPropsSucursal> = ({ empresa, onVistaAdmin }) => {
  const [sucursales, setSucursales] = useState<ISucursal[]>(empresa.sucursales);

  const { isPopUpVisible, HandlePopUp } = usePopUpVisible();

  const { informacion, mostrarInformacion, cerrarInformacion } =
    useInformacion();

  useEffect(() => {
    setSucursales(empresa.sucursales);
  }, [sucursales]);

  return (
    <>
      <hr style={{ width: "95%" }} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h3 className={styleSucursal.title} style={{ margin: "0" }}>
          {empresa.nombre} - {""}
        </h3>
        <Button style={{ width: "13vw", height: "auto" }} onClick={HandlePopUp}>
          Agregar Sucursal
        </Button>
      </div>
      <div className={styleSucursal.containerPrincipal}>
        <div className={styleSucursal.containerSucursal}>
          {sucursales.map((sucursal) => (
            <div key={sucursal.id}>
              <SucursalCard
                sucursal={sucursal}
                idEmpresa={empresa.id}
                onSucursalActiva={() => mostrarInformacion(sucursal.id)}
                onVistaAdmin={onVistaAdmin}
              />

              {informacion === sucursal.id && (
                <Sucursalnfo
                  sucursal={sucursal}
                  onVerSucursal={cerrarInformacion}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {isPopUpVisible && (
        <ModalCrearSucursal
          empresa={empresa}
          visible={isPopUpVisible}
          onClose={HandlePopUp}
        />
      )}
    </>
  );
};
