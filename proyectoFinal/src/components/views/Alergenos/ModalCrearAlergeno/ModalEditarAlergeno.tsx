import { ChangeEvent, FC, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "../../../../hooks/useForm";

import styleModalEmpresa from "./ModalCrearEmpresa.module.css";
import addImagen from "./imagen.png";
import { ServiceEmpresa } from "../../../../services/ServiceEmpresa";
import { ICreateEmpresaDto } from "../../../../types/dtos/empresa/ICreateEmpresaDto";
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
          <h2 style={{width:'100%', color:'black', textAlign:'center', margin:'0'}}>Crear un alergeno</h2>
        <div className={styleModalEmpresa.contenido}>
          {/* <h2>Crear empresa</h2> */}

          {/* FORMULARIO PARA AGREGAR ALERGENO */}
          <form
            onSubmit={handleSubmit}
            className={styleModalEmpresa.formulario}
          >
            {/* DENOMINACION DEL ALERGENO */}
            <input
              type="text"
              name="denominacion"
              placeholder="Ingrese una denominacion"
              value={denominacion}
              onChange={handleChange}
              required
            />
            {/* AGREGAR IMAGEN */}
            <div className={styleModalEmpresa.imagenContainer}>
              <input
                type="text"
                name="imagen"
                placeholder="Ingresa una imagen"
                value={url}
                onChange={handleChange}
              />
              <img src={addImagen} alt={name} />
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

export default ModalCrearAlergeno;
