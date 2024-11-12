import { ChangeEvent, FC, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "../../../../hooks/useForm";

import styleModalEmpresa from "./ModalCrearEmpresa.module.css";
import addImagen from "./imagen.png";
import { ServiceEmpresa } from "../../../../services/ServiceEmpresa";
import { ICreateEmpresaDto } from "../../../../types/dtos/empresa/ICreateEmpresaDto";

interface PopUpPropsEmpresa {
  visible: boolean;
  onClose: () => void;
}

const ModalCrearEmpresa: FC<PopUpPropsEmpresa> = ({ visible, onClose }) => {

  //const dispatch = useDispatch<AppDispatch>();
  const serviceEmpresa = new ServiceEmpresa();

  const [empresaId, setEmpresaId] = useState<number>(0)

  const { values, handleChange, resetForm } = useForm({
    nombre: "",
    razonSocial: "",
    cuit: 0,
    logo: "",
  });

  const { nombre, razonSocial, cuit, logo } = values;

  const handleCreateEmpresa = async (empresa: ICreateEmpresaDto) => {

    try {
      const response = await serviceEmpresa.createOneEmpresa(empresa)

      if(response && response.id){
        setEmpresaId(response.id);
        console.log("ID de empresa creada: ", response.id)
      }

    } catch (error) {
      console.error("Error crear Empresa: ", error)
    }
    //onAddEmpresa(newEmpresa);
  };

  const addForm = () => {
    const newEmpresa: ICreateEmpresaDto = {
      nombre: nombre,
      razonSocial: razonSocial,
      cuit: cuit,
      logo: logo,
    };
    handleCreateEmpresa(newEmpresa);
    resetForm(); // Cerrar el modal
    onClose()
  }  

  const cancelForm = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  // Si no está visible, no renderiza nada
  if (!visible) {
    return null;
  }

  return (
    <div className={styleModalEmpresa.containerPopUp}>
      <div className={styleModalEmpresa.popUpContainer}>
          <h2 style={{width:'100%', color:'black', textAlign:'center', margin:'0'}}>Crear Empresa</h2>
        <div className={styleModalEmpresa.contenido}>
          {/* <h2>Crear empresa</h2> */}

          {/* FORMULARIO PARA AGREGAR EMPRESA */}
          <form
            onSubmit={handleSubmit}
            className={styleModalEmpresa.formulario}
          >
            {/* NOMBRE DE LA EMPRESA */}
            <input
              type="text"
              name="nombre"
              placeholder="Ingrese un nombre"
              value={nombre}
              onChange={handleChange}
              required
            />
            {/* RAZON SOCIAL DE LA EMPRESA */}
            <input
              type="text"
              name="razonSocial"
              placeholder="Ingrese una razon social"
              value={razonSocial}
              onChange={handleChange}
              required
            />
            {/* CUIL */}
            <input
              type="number"
              name="cuil"
              placeholder="Ingrese un cuil"
              value={cuit}
              onChange={handleChange}
            />
            {/* AGREGAR IMAGEN */}
            <div className={styleModalEmpresa.imagenContainer}>
              <input
                type="text"
                name="imagen"
                placeholder="Ingresa una imagen"
                value={logo}
                onChange={handleChange}
              />
              <img src={addImagen} alt="imagen del boton" />
              {/* AGREGAR FUNCIONALIDAD PARA SUBIR UNA IMAGEN */}
            </div>
            <div className={styleModalEmpresa.containerButtonsForm}>
              <Button
                variant="primary"
                type="submit"
                onClick={addForm}
                className={styleModalEmpresa.formButton}
              >
                Enviar
              </Button>{" "}
              <Button
                variant="primary"
                onClick={cancelForm}
                className={styleModalEmpresa.formButton}
              >
                Cerrar
              </Button>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCrearEmpresa;
