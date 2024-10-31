import { Button } from "react-bootstrap";
import { useForm } from "../../../hooks/useForm/useForm";

import styleModalEmpresa from "./ModalCrearEmpresa.module.css";
import addImagen from "./imagen.png";
import { FC } from "react";

interface PopUpProps {
  visible: boolean;
  onClose: () => void;
  onAddEmpresa: Function;
  // onAddEmpresa: (nombre: string, razonSocial: string, cuil: string, selectedImage: string | null) => void;
}

const ModalCrearEmpresa : FC<PopUpProps> = ({ visible, onClose, onAddEmpresa }) => {

  const { values, handleChange, resetForm } = useForm({
    nombre: '',
    razonSocial: '',
    cuil: 0,
    imagen: ''
  });

  const { nombre, razonSocial, cuil, imagen } = values;

  const addForm = () => {
    onAddEmpresa(nombre, razonSocial, cuil, imagen); // Agregar empresa
    resetForm(); // Cerrar el modal
    onClose()
  }  

  const cancelForm = () => {
    resetForm()
    onClose()
  }

  // const handleSubmit = () => {
  //   resetForm()
  //   onClose()
  // };
  
    if (!visible) {
      return null; // Si no está visible, no renderiza nada
    }
  
  return (
    <div className={styleModalEmpresa.containerPopUp}>
      <div className={styleModalEmpresa.popUpContainer}>
        <div className={styleModalEmpresa.contenido}>
          <h2>Crear empresa</h2>

          {/* FORMULARIO PARA AGREGAR EMPRESA */}
          <form
            className={styleModalEmpresa.formulario}
          >
            {/* NOMBRE DE LA EMPRESA */}
            <input
              type="text"
              name='nombre'
              placeholder="Ingrese un nombre"
              value={nombre}
              onChange={handleChange}
              required
            />
            {/* RAZON SOCIAL DE LA EMPRESA */}
            <input
              type="text"
              name='razonSocial'
              placeholder="Ingrese una razon social"
              value={razonSocial}
              onChange={handleChange}
              required
            />
            {/* CUIL */}
            <input
              type="number"
              name='cuil'
              placeholder="Ingrese un cuil"
              value={cuil}
              onChange={handleChange}
              required
            />
            {/* AGREGAR IMAGEN */}
            <div className={styleModalEmpresa.imagenContainer}>
              <input
                type="text"
                name='imagen'
                placeholder="Ingresa una imagen"
                value={imagen}
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