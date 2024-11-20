import { ChangeEvent, FC } from "react";
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
  const serviceEmpresa = new ServiceEmpresa();

  const { values, handleChange, resetForm } = useForm({
    nombre: "",
    razonSocial: "",
    cuit: 0,
    logo: "",
  });

  const handleCreateEmpresa = async (empresa: ICreateEmpresaDto) => {
    try {
      await serviceEmpresa.createOneEmpresa(empresa);
    } catch (error) {
      console.error("Error crear Empresa: ", error);
    }
  };

  const addForm = () => {
    const newEmpresa: ICreateEmpresaDto = {
      nombre: values.nombre,
      razonSocial: values.razonSocial,
      cuit: values.cuit,
      logo: values.logo,
    };
    handleCreateEmpresa(newEmpresa);
    resetForm();
    onClose();
  };

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
        <h2
          style={{
            width: "100%",
            color: "black",
            textAlign: "center",
            margin: "0",
          }}
        >
          Crear Empresa
        </h2>
        <div className={styleModalEmpresa.contenido}>
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
              className={styleModalEmpresa.inputElement}
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
            <div className={styleModalEmpresa.cuitContainer}>
              <label htmlFor="cuit" >
                CUIT:
              </label>
              <input
                type="number"
                name="cuit"
                value={values.cuit}
                onChange={handleChange}
              />
            </div>
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
                onClick={cancelForm}
                className={styleModalEmpresa.formButtonCancel}
              >
                Cerrar
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={addForm}
                className={styleModalEmpresa.formButtonSend}
              >
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCrearEmpresa;
