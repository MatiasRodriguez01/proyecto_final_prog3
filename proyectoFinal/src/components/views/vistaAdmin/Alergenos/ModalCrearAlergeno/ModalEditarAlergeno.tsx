import { FC, FormEvent } from "react";
import { Button, Modal } from "react-bootstrap";

import stylesModalCrearAlergeno from "./ModalCrearAlergeno.module.css"
import addImagen from "./imagen.png";
import { useForm } from "../../../../../hooks/useForm";
import { ServiceAlergenos } from "../../../../../services/ServiceAlergenos";
import { IImagen } from "../../../../../types/IImagen";
import { IAlergeno } from "../../../../../interfaces/IAlergeno";
import { IUpdateAlergeno } from "../../../../../types/dtos/alergenos/IUpdateAlergeno";


interface PopUpPropsAlergeno {
  alergeno: IAlergeno;
  visible: boolean;
  onClose: () => void;
}

export const ModalEditarAlergeno: FC<PopUpPropsAlergeno> = ({ alergeno, visible, onClose }) => {

  //const dispatch = useDispatch<AppDispatch>();
  const serviceAlergeno = new ServiceAlergenos()

  //const [empresaId, setEmpresaId] = useState<number>(0)

  const { values, handleChange, resetForm } = useForm({
    denominacion: alergeno.denominacion,
    name:  `imagen de ${alergeno.denominacion}`,
    url: alergeno.denominacion,
  });

  const { denominacion, name, url } = values;

  const handleEditarAlergeno = async (newAlergeno: IUpdateAlergeno) => {

    try {
      const idAlergeno = Number(alergeno.id)
      const response = await serviceAlergeno.editOneAlergeno(idAlergeno, newAlergeno)
      console.log(response.id)
    } catch (error) {
      console.error("Error crear Empresa: ", error)
    }
    //onAddEmpresa(newEmpresa);
  };

  const addForm = () => {
    const newAlergeno: IUpdateAlergeno = {
      id: Number(alergeno.id),
      eliminado: false,
      denominacion: denominacion,
      imagen: {
        name,
        url
      } as IImagen
    };
    handleEditarAlergeno(newAlergeno);
    resetForm(); // Cerrar el modal
    onClose()
  }  

  const cancelForm = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addForm()
  };
  // Si no está visible, no renderiza nada
  if (!visible) {
    return null;
  }

  return (
    <Modal show={visible} onHide={onClose}>
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

