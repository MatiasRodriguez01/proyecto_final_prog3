import { ChangeEvent, useState } from "react";
import styleModalEmpresa from "./ModalCrearEmpresa.module.css";
import imagen from "./imagen.png";
import { Button } from "react-bootstrap";

interface PopUpProps {
  visible: boolean;
  onClose: () => void;
  onAddEmpresa: (nombre: string, razonSocial: string, cuil: string) => void;
}

const PopUp = ({ visible, onClose, onAddEmpresa }: PopUpProps) => {
  const [inputNombre, setInputNombre] = useState<string>("");
  const [inputRazonSocial, setInputRazonSocial] = useState<string>("");
  const [inputCuil, setInputCuil] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [fileKey, setFileKey] = useState<number>(0); //Agregamos un id unico para las imagenes para poder esetear bien el formulario

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddEmpresa(inputNombre, inputRazonSocial, inputCuil); // Agregar empresa
    setInputNombre("");
    setInputRazonSocial("");
    setInputCuil("");
    resetForm(); // Cerrar el modal
  };

  const resetForm = () => {
    setInputNombre("");
    setInputRazonSocial("");
    setInputCuil("");
    setSelectedImage(null);
    setFileKey((prevKey) => prevKey + 1); //Aumentamos la key para que react pueda resetear el formulario de manera correcta
    onClose();
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
              onChange={(e) => setInputNombre(e.target.value)}
              required
            />
            {/* RAZON SOCIAL DE LA EMPRESA */}
            <input
              type="text"
              placeholder="Ingrese una razon social"
              value={inputRazonSocial}
              onChange={(e) => setInputRazonSocial(e.target.value)}
              required
            />
            {/* CUIL */}
            <input
              type="string"
              placeholder="Ingrese un cuil"
              value={inputCuil}
              onChange={(e) => setInputCuil(e.target.value)}
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

export default PopUp;
