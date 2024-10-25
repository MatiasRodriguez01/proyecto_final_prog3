import { ChangeEvent, useState } from "react";
import stylePopUp from "./PopUp.module.css";
import imagen from "./imagen.png"

interface PopUpProps {
  visible: boolean;
  onClose: () => void;
  onAddEmpresa: (nombre: string) => void;
}

const PopUp = ({ visible, onClose, onAddEmpresa }: PopUpProps) => {
  const [inputName, setInputName] = useState<string>(""); // input del nombre
  const [inputNumbre, setInputNumbre] = useState<number>(0); // input del cuil
  const [inputRazonSocial, setInputRazonSocial] = useState<string>(""); // input de la razon social

  const handleInputName = (event: ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };
  const handleInputNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNumbre(Number(event.target.value))
  };
  const handleInputRazonSocial = (event: ChangeEvent<HTMLInputElement>) => {
    setInputRazonSocial(event.target.value);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputName(""); // Limpiar el input
    onClose(); // Cerrar el modall
  };

  const handleClickEmpresa = () => {
    onAddEmpresa(inputName); // Agregar empresa
    onClose(); // Cerrar el modall
  }

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
              value={inputName}
              onChange={handleInputName}
            />
            <input type="text"
              placeholder="Ingrese una razon social"
              value={inputRazonSocial}
              onChange={handleInputRazonSocial}
            />
            <input type="number"
              placeholder="Ingrese un cuil"
              value={inputNumbre}
              onChange={handleInputNumber}
            />
            <div className={stylePopUp.imagenContainer}>
              <button>Agregar imagen</button>
              <img src={imagen} alt="imagen del boton" />
            </div>
          </form>
          <div className={stylePopUp.buttons}>
            <button type="submit" onClick={handleClickEmpresa}>Enviar</button>
            <button type="submit" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
