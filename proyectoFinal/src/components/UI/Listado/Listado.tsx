import { FC, useEffect, useState } from "react";

import styleListado from "./Listado.module.css";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { ServiceEmpresa } from "../../../services/EmpresaService";
import { EmpresaListado } from "../../views/Empresas/EmpresasListado/EmpresaListado";
import { UseSucursal } from "../../views/Sucursales/useSucursal/UseSucursal";
import { ModalCrearSucursal } from "../../views/Sucursales/ModalCrearSucursal/ModalCrearSucursal";
import { useListado } from "../../../hooks/useListado";
import { Button } from "react-bootstrap";

export const Listado: FC = () => {
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const serviceEmpresa = new ServiceEmpresa();

  const {isPopUpVisible, HandlePopUp} = useListado()

  const [clickEmpresa, setClickEmpresa] = useState<boolean>(false);

  const handleChangeEmpresa = () => {
    setClickEmpresa(!clickEmpresa)
  }


  useEffect(() => {
    const fetchEmpresas = async () => {
      const e = await serviceEmpresa.getAllEmpresas();
      setEmpresas(e); // Verifica si `empresas` contiene datos
    }
    fetchEmpresas()
  }, [empresas]);


  return (
    <>
      <article className={styleListado.container}>

        <section className={styleListado.containerEmpresas}>
          <EmpresaListado empresas={empresas} onClickEmpresa={handleChangeEmpresa} />
        </section>

        <section className={styleListado.containerSucursales}>
          <div className={styleListado.titulo}>
            <h2>Sucursales</h2>
          </div>
          <Button onClick={HandlePopUp}>Agregar Sucursal</Button>
          {
            empresas.map((empresa) => (
              <ModalCrearSucursal empresa={empresa} visible={isPopUpVisible} onClose={HandlePopUp}></ModalCrearSucursal>
            ))
          }
        </section>

      </article>
    </>
  );
};
// 