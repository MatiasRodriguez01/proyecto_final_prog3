import { ChangeEvent, FC } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "../../../../hooks/useForm";

import styleModalEmpresa from "./ModalCrearEmpresa.module.css";
import addImagen from "./imagen.png";

interface PopUpPropsEmpresa {
  visible: boolean;
  onClose: () => void;
  onAddEmpresa: Function;
}

const ModalCrearEmpresa: FC<PopUpPropsEmpresa> = ({
  visible,
  onClose,
  onAddEmpresa,
}) => {
  const { values, handleChange, resetForm } = useForm({
    nombre: "",
    razonSocial: "",
    cuil: 0,
    imagen: "",
  });

  const { nombre, razonSocial, cuil, imagen } = values;

  const addForm = () => {
    // Agregar empresa
    onAddEmpresa(nombre, razonSocial, cuil, imagen);
    // Resetear el form cuando se cierra
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
        <div className={styleModalEmpresa.contenido}>
          <h2>Crear empresa</h2>

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
              value={cuil}
              onChange={handleChange}
              required
            />
            {/* AGREGAR IMAGEN */}
            <div className={styleModalEmpresa.imagenContainer}>
              <input
                type="text"
                name="imagen"
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
