import { ChangeEvent, FC } from "react";
import { ServiceAlergenos } from "../../../../../services/ServiceAlergenos";
import { useForm } from "../../../../../hooks/useForm";
import { ICreateAlergeno } from "../../../../../types/dtos/alergenos/ICreateAlergeno";
import { IImagen } from "../../../../../types/IImagen";
import { Button, Modal } from "react-bootstrap";
import stylesModalCrearAlergeno from "./ModalCrearAlergeno.module.css"
import addImagen from "./imagen.png"
interface PopUpPropsAlergeno {
  show: boolean;
  onClose: () => void;
}

const ModalCrearAlergeno: FC<PopUpPropsAlergeno> = ({ show, onClose }) => {
  const serviceAlergeno = new ServiceAlergenos();

  const { values, handleChange, resetForm } = useForm({
    denominacion: "",
    name: "",
    url: "",
  });

  const { denominacion, name, url } = values;

  const handleCreateAlergeno = async (alergeno: ICreateAlergeno) => {
    try {
      const response = await serviceAlergeno.createOneAlergeno(alergeno);
      console.log("Alergeno creado con ID: ", response?.id);
    } catch (error) {
      console.error("Error al crear el alergeno: ", error);
    }
  };

  const addForm = () => {
    const newAlergeno: ICreateAlergeno = {
      denominacion: denominacion,
      imagen: {
        name: `imagen de ${denominacion}`,
        url,
      } as IImagen,
    };
    handleCreateAlergeno(newAlergeno);
    resetForm(); 
    onClose();
  };

  const cancelForm = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    addForm();
  };

  
  if (!show) {
    return null;
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Crear un alergeno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} >
          {/* DENOMINACION DEL ALERGENO */}
          <input
            type="text"
            name="denominacion"
            placeholder="Ingrese una denominación"
            value={denominacion}
            onChange={handleChange}
            required
            style={{width: "65%"}}
          />
          {/* AGREGAR IMAGEN */}
          <div className={stylesModalCrearAlergeno.imagenContainer}>
            <input
              type="text"
              name="url"
              placeholder="Ingresa la URL de la imagen"
              value={url}
              onChange={handleChange}
              required
            />
            <img src={addImagen} alt={name} style={{width: "10vw", height: "auto"}}/>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={cancelForm} className={stylesModalCrearAlergeno.buttonCancel}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={addForm} className={stylesModalCrearAlergeno.buttonAccept}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCrearAlergeno;
