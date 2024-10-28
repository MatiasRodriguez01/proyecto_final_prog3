import { ChangeEvent, useState } from "react";
import { Button } from "react-bootstrap";
import { useImage } from "../../../hooks/modalCrearEmpresa/useImage/useImage";
import { useNombre } from "../../../hooks/modalCrearEmpresa/useNombre/useNombre";
import { useRazonSocial } from "../../../hooks/modalCrearEmpresa/useRazonSocial/useRazonSocial";
import { useCuil } from "../../../hooks/modalCrearEmpresa/useCuil/useCuil";

import styleModalEmpresa from "./ModalCrearEmpresa.module.css";
import imagen from "./imagen.png";

interface PopUpProps {
  visible: boolean;
  onClose: () => void;
  onAddEmpresa: (nombre: string, razonSocial: string, cuil: string, selectedImage: string | null) => void;
}

const ModalCrearEmpresa = ({ visible, onClose, onAddEmpresa }: PopUpProps) => {
  
  const { inputNombre, handleChangeNombre, handleNombreNull } = useNombre() // en useNombre asignamos el valor del inputNombre, change para modificarlo, y el null para retornar vacio
  const { inputRazonSocial, handleChangeRazonSocial, handleRazonSocialNull } = useRazonSocial() // en useRazonSocial asignamos el valor del inputRazonSocial, change para modificarlo, y el null para retornar vacio
  const { inputCuil, handleChangeCuil, handleCuilNull } = useCuil() // en useCuil asignamos el valor del inputCuil, change para modificarlo, y el Null para retornar vacio
  const { selectedImage, handleImageUpload, handleImageNull } = useImage() // en useImage asignamos una imagen, change para modificarlo, y el Null para retornar vacio
  const [fileKey, setFileKey] = useState<number>(0); //Agregamos un id unico para las imagenes para poder esetear bien el formulario

  const resetForm = () => {
    handleNombreNull();
    handleRazonSocialNull();
    handleCuilNull();
    handleImageNull();
    setFileKey((prevKey) => prevKey + 1); //Aumentamos la key para que react pueda resetear el formulario de manera correcta
    onClose();
  };

  const addForm = () => {
    onAddEmpresa(inputNombre, inputRazonSocial, inputCuil,selectedImage); // Agregar empresa
    resetForm(); // Cerrar el modal
  }  

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  
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
            onSubmit={handleSubmit}
          >
            {/* NOMBRE DE LA EMPRESA */}
            <input
              type="text"
              placeholder="Ingrese un nombre"
              value={inputNombre}
              onChange={handleChangeNombre}
              required
            />
            {/* RAZON SOCIAL DE LA EMPRESA */}
            <input
              type="text"
              placeholder="Ingrese una razon social"
              value={inputRazonSocial}
              onChange={handleChangeRazonSocial}
              required
            />
            {/* CUIL */}
            <input
              type="string"
              placeholder="Ingrese un cuil"
              value={inputCuil}
              onChange={handleChangeCuil}
              required
            />
            {/* AGREGAR IMAGEN */}
            <div className={styleModalEmpresa.imagenContainer}>
              <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                <Button variant="secondary" as="span">
                  Agregar Imagen
                </Button>
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                key={fileKey}
                style={{ display: "none" }}
              />
              {selectedImage ? (
                <img src={selectedImage} alt="Vista Previa" />
              ) : (
                <img src={imagen} alt="imagen del boton" />
              )}
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
                onClick={resetForm}
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