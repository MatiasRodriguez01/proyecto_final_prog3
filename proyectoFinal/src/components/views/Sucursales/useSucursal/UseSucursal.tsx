import { Button } from "react-bootstrap";
import { FC, useEffect, useState } from "react";

import { SucursalCard } from "../SucursalCard/SucursalCard";
import { Sucursalnfo } from "../sucursalnfo/Sucursalnfo";
import { ModalCrearSucursal } from "../ModalCrearSucursal/ModalCrearSucursal";

import styleSucursal from "../useSucursal/UseSucursal.module.css";
import { useInformacion } from "../../../../hooks/useInformacion";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { usePopUpVisible } from "../../../../hooks/usePopUpVisible";
import { useDispatch } from "react-redux";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { ServiceSucursal } from "../../../../services/ServiceSucursal";
import { guardarSucursales } from "../../../../redux/slices/sucursalSlice";

interface IPropsSucursal {
  empresa: IEmpresa;
  onVistaAdmin: () => void;
}

export const UseSucursal: FC<IPropsSucursal> = ({ empresa, onVistaAdmin }) => {
  const dispatch = useDispatch();

  const serviceSucursal = new ServiceSucursal();

  const [sucursales, setSucursales] = useState<ISucursal[]>([]);

  const { isPopUpVisible, HandlePopUp } = usePopUpVisible();

  const { informacion, mostrarInformacion, cerrarInformacion } =
    useInformacion();

  useEffect(() => {
    const fetctSucursalesSegunEmpresas = async () => {
      try {
        // Primero obtenemos todas las empresas
        const sucursalesDeEmpresa =
          await serviceSucursal.getAllSucursalesByEmpresa(empresa.id);
        setSucursales(sucursalesDeEmpresa);
        dispatch(guardarSucursales(sucursales));
      } catch (error) {
        console.error("Error al obtener las empresas:", error);
      }
    };

    fetctSucursalesSegunEmpresas();
  }, [sucursales, dispatch]);

  return (
    <>
      <div className={styleSucursal.containerHeader}>
        <h3 className={styleSucursal.title}>{empresa.nombre}</h3>
        <Button className={styleSucursal.addSucursalButton} onClick={HandlePopUp}>
          AGREGAR SUCURSAL
          <span className="material-symbols-outlined">add</span>
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
