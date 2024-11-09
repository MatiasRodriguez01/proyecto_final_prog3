import { Button } from "react-bootstrap";
import { FC, useState, useEffect } from "react";

import { SucursalCard } from "../SucursalCard/SucursalCard";
import { Sucursalnfo } from "../sucursalnfo/Sucursalnfo";
import { ModalCrearSucursal } from "../ModalCrearSucursal/ModalCrearSucursal";

import styleSucursal from "../useSucursal/UseSucursal.module.css";
import { useInformacion } from "../../../../hooks/useInformacion";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { useListado } from "../../../../hooks/useListado";

interface IPropsSucursal {
  empresa: IEmpresa;
  isClick: boolean
}

export const UseSucursal: FC<IPropsSucursal> = ({ empresa, isClick }) => {

  const [sucursales, setSucursales] = useState<ISucursal[]>(empresa.sucursales);

  const { isPopUpVisible, HandlePopUp } = useListado()

  const { informacion, mostrarInformacion, cerrarInformacion } = useInformacion()


  useEffect(() => {
    setSucursales(empresa.sucursales);
  }, [sucursales]);


  if (isClick) {
    return (
      <>
        <h3 className={styleSucursal.title}>{empresa.nombre}</h3>
        <div className={styleSucursal.boton_agregar}>
          <Button onClick={HandlePopUp} style={{ width: '10vw', height: '6vh' }}>Agregar sucursal</Button>
        </div>
        <div className={styleSucursal.containerPrincipal}>
          <div className={styleSucursal.containerSucursal}>
            {sucursales.map((sucursal) => (
              <div key={sucursal.id}>
                <SucursalCard
                  sucursal={sucursal}
                  onSucursalActiva={() => mostrarInformacion(sucursal.id)}
                />

                {
                  (informacion === sucursal.id) && (
                    <Sucursalnfo
                      sucursal={sucursal}
                      onVerSucursal={cerrarInformacion}
                    />
                  )
                }
              </div>
            ))}
          </div>
        </div>


        {
          isPopUpVisible && (
            <ModalCrearSucursal visible={isPopUpVisible} onClose={HandlePopUp} />
          )
        }
      </>
    );
  }
};


