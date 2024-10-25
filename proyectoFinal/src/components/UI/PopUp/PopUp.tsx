import { ChangeEvent, useState } from "react";
import stylePopUp from "./PopUp.module.css";
import imagen from "./imagen.png"

interface PopUpProps {
  visible: boolean;
  onClose: () => void;
  onAddEmpresa: (nombre: string) => void;
}

const PopUp = ({ visible, onClose, onAddEmpresa }: PopUpProps) => {
  const [input, setInput] = useState<string>("");

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddEmpresa(input); // Agregar empresa
    setInput(""); // Limpiar el input
    onClose(); // Cerrar el modal
  };

  if (!visible) {
    return null; // Si no está visible, no renderiza nada
  }

  return (
    <div className={stylePopUp.containerPopUp}>
      <div className={stylePopUp.popUpContainer}>
        <div className={stylePopUp.contenido}>
          <h2>Crear empresa</h2>
          <form className={stylePopUp.formulario} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ingrese un nombre"
              value={input}
              onChange={handleChangeInput}
            />
            <input type="text" placeholder="Ingrese una razon social" />
            <input type="text" placeholder="Ingrese un cuil" />
            <div className={stylePopUp.imagenContainer}>
              <button>Agregar imagen</button>
              <img src={imagen} alt="imagen del boton" />
            </div>
          </form>
          <div className={stylePopUp.buttons}>
            <button type="submit">Enviar</button>
            <button onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
