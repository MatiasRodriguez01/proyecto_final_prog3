import { Button } from "react-bootstrap";
import { FC, useState, useEffect } from "react";
import { IEmpresa } from "../../../../interfaces/IEmpresa";
import { ISucursal } from "../../../../interfaces/ISucursal";

import { SucursalCard } from "../SucursalCard/SucursalCard";
import { Sucursalnfo } from "../sucursalnfo/Sucursalnfo";
import { ModalCrearSucursal } from "../ModalCrearSucursal/ModalCrearSucursal";

import styleSucursal from "../useSucursal/UseSucursal.module.css";
import { useInformacion } from "../../../../hooks/useInformacion";

interface IPropsSucursal {
  empresa: IEmpresa;
  empresaActiva: string;
  prop_sucursales: ISucursal[],
  onAddSucursal: Function,
  onDeleteSucursal: Function;
  isLoggin: () => void;
}

export const UseSucursal: FC<IPropsSucursal> = ({ empresa, empresaActiva, prop_sucursales, onAddSucursal, onDeleteSucursal, isLoggin }) => {

  const [sucursales, setSucursales] = useState<ISucursal[]>(prop_sucursales);

  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);

  const {  informacion, mostrarInformacion, cerrarInformacion } = useInformacion()

  
  const handleAddSucursal = () => {
    setIsPopUpVisible(!isPopUpVisible)
    
  };
  
  useEffect(() => {
    setSucursales(empresa.sucursales);
    prop_sucursales = sucursales;
  }, [empresaActiva, prop_sucursales]);

  if (empresa.id === empresaActiva) {
    return (
      <>
        <h3 className={styleSucursal.title}>{empresa.nombre}</h3>
        <div className={styleSucursal.boton_agregar}>
          <Button onClick={handleAddSucursal}>Agregar sucursal</Button>
        </div>
        <div className={styleSucursal.containerPrincipal}>
          <div className={styleSucursal.containerSucursal}>
            {prop_sucursales.map((sucursal) => (
              <div key={sucursal.id}>
                <SucursalCard
                  sucursal={sucursal}
                  onSucursalActiva={() => mostrarInformacion(sucursal.id)}
                  onDeleteSucursal={() => onDeleteSucursal(sucursal.id)}
                  isLoggin={isLoggin}
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
            <ModalCrearSucursal visible={isPopUpVisible} onClose={() => setIsPopUpVisible(false)} onAddSucursal={onAddSucursal}/>
          )
        }
      </>
    );
  }

  return null;
};
