import { FC, useState, useEffect } from "react";
import { IEmpresa } from "../../../interfaces/IEmpresa";
import { Button, Card } from "react-bootstrap";
import styleSucursal from "./UseSucursal.module.css";
import { ISucursales } from "../../../interfaces/ISucursal";

interface IPropsSucursal {
  empresa: IEmpresa;
  empresaActiva: number;
}

export const UseSucursal: FC<IPropsSucursal> = ({ empresa, empresaActiva }) => {
  const [sucursales, setSucursales] = useState<ISucursales[]>(empresa.sucursales);
  
  useEffect(() => {
    setSucursales(empresa.sucursales);
  }, [empresaActiva, empresa.sucursales]);
  
  const handleAddSucursal = () => {
    const nuevaSucursal: ISucursales = {
      id: sucursales.length,
      nombre: `sucursal nueva ${sucursales.length + 1}`
    };
    setSucursales([...sucursales, nuevaSucursal]);
  };

  const handleDeleteSucursal = (id: number) => {
    setSucursales((prev) => prev.filter((s) => s.id !== id));
  };

  if (empresa.id === empresaActiva) {
    return (
      <>
        <h3 className={styleSucursal.title}>{empresa.nombre}</h3>
        <div className={styleSucursal.boton_agregar}>
          <Button onClick={handleAddSucursal}>Agregar sucursal</Button>
        </div>
        <div className={styleSucursal.containerPrincipal}>
          <div className={styleSucursal.containerSucursal}>
            {sucursales.map((sucursal, index) => (
              <Card key={index} style={{ width: "18rem", height: "auto" }}>
                <Card.Body style={{ height: "auto" }}>
                  <Card.Title style={{ height: "auto", textAlign: "center" }}>
                    {sucursal.nombre}
                  </Card.Title>
                  <div className={styleSucursal.buttons}>
                    <Button
                      className={styleSucursal.button}
                      variant="primary"
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ height: "auto", textAlign: "center" }}
                      >
                        visibility
                      </span>
                    </Button>{" "}
                    <Button
                      onClick={() => handleDeleteSucursal(sucursal.id)}
                      className={styleSucursal.button}
                      variant="danger"
                    >
                      <span className="material-symbols-outlined">
                        delete_forever
                      </span>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </>
    );
  }

  return null;
};
