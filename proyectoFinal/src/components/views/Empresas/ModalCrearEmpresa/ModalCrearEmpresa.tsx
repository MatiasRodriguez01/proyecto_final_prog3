import { ChangeEvent, FC } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "../../../../hooks/useForm";

import styleModalEmpresa from "./ModalCrearEmpresa.module.css";
import addImagen from "./imagen.png";
import { ServiceEmpresa } from "../../../../services/ServiceEmpresa";
import { ICreateEmpresaDto } from "../../../../types/dtos/empresa/ICreateEmpresaDto";
//import { useDispatch } from "react-redux";

interface PopUpPropsEmpresa {
  visible: boolean;
  onClose: () => void;
}

const ModalCrearEmpresa: FC<PopUpPropsEmpresa> = ({ visible, onClose }) => {

  //const dispatch = useDispatch();
  const serviceEmpresa = new ServiceEmpresa();

  const { values, handleChange, resetForm } = useForm({
    nombre: '',
    razonSocial: '',
    cuit: 0,
    logo: '',
  });

  const handleCreateEmpresa = async (empresa: ICreateEmpresaDto) => {

    try {
      await serviceEmpresa.createOneEmpresa(empresa);

    } catch (error) {
      console.error("Error crear Empresa: ", error)
    }
    //onAddEmpresa(newEmpresa);
  };

  const addForm = () => {
    const newEmpresa: ICreateEmpresaDto = {
      nombre: values.nombre,
      razonSocial: values.razonSocial,
      cuit: values.cuit,
      logo: values.logo,
    };
    handleCreateEmpresa(newEmpresa)
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
              value={values.nombre}
              onChange={handleChange}
              required
            />
            {/* RAZON SOCIAL DE LA EMPRESA */}
            <input
              type="text"
              name="razonSocial"
              placeholder="Ingrese una razon social"
              value={values.razonSocial}
              onChange={handleChange}
              required
            />
            {/* CUIL */}
            <input
              type="number"
              name="cuit"
              placeholder="Ingrese un cuil"
              value={values.cuit}
              onChange={handleChange}
              required
            />
            {/* AGREGAR IMAGEN */}
            <div className={styleModalEmpresa.imagenContainer}>
              <input
                type="text"
                name="logo"
                placeholder="Ingresa una imagen"
                value={values.logo}
                onChange={handleChange}
                required
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
