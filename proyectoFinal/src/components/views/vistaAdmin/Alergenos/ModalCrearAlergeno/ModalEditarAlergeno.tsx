import { FC, FormEvent } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "../../../../hooks/useForm";
import stylesModalCrearAlergeno from "./ModalCrearAlergeno.module.css"
import addImagen from "./imagen.png";
import {ServiceAlergenos} from "../../../../services/ServiceAlergenos"
import { ICreateAlergeno } from "../../../../types/dtos/alergenos/ICreateAlergeno";
import { IImagen } from "../../../../types/IImagen";

interface PopUpPropsAlergeno {
  visible: boolean;
  onClose: () => void;
}

const ModalCrearAlergeno: FC<PopUpPropsAlergeno> = ({ visible, onClose }) => {

  //const dispatch = useDispatch<AppDispatch>();
  const serviceAlergeno = new ServiceAlergenos()

  //const [empresaId, setEmpresaId] = useState<number>(0)

  const { values, handleChange, resetForm } = useForm({
    denominacion: "",
    name: "",
    url: "",
  });

  const { denominacion, name, url } = values;

  const handleCreateAlergeno = async (alergeno: ICreateAlergeno) => {

    try {
      const response = await serviceAlergeno.createOneAlergeno(alergeno)

      /*if(response && response.id){
        setEmpresaId(response.id);
        console.log("ID de empresa creada: ", response.id)
      }*/

    } catch (error) {
      console.error("Error crear Empresa: ", error)
    }
    //onAddEmpresa(newEmpresa);
  };

  const addForm = () => {
    const newAlergeno: ICreateAlergeno = {
      denominacion: denominacion,
      imagen: {
        name,
        url
      } as IImagen
    };
    handleCreateAlergeno(newAlergeno);
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

export default ModalCrearAlergeno;
