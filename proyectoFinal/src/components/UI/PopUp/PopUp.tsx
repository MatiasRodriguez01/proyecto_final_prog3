import { ChangeEvent, useState } from "react";
import stylePopUp from "./PopUp.module.css";

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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ingrese el nombre de la empresa"
              value={input}
              onChange={handleChangeInput}
            />
            <button type="submit">Enviar</button>
          </form>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;