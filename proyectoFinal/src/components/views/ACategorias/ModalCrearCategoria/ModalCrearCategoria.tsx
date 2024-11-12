import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import stylesCrearCategoria from "./ModalCrearCategoria.module.css";

interface ModalCrearCategoriaProps {
  show: boolean;
  onClose: () => void;
  categoria?: any;
}

const ModalCrearCategoria: React.FC<ModalCrearCategoriaProps> = ({
  show,
  onClose,
}) => {
  // Estado para manejar los valores del formulario
  const [categoryName, setCategoryName] = useState<string>("");

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (!categoryName) {
      alert("Por favor ingrese el nombre de la categoría.");
      return;
    }

    // Aquí podrías agregar la lógica para guardar la nueva categoría
    console.log("Categoría creada:", { categoryName });

    // Llamada para cerrar el modal después de guardar la categoría
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header >
        <Modal.Title>Crear Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Formulario para crear categoría */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={categoryName}
            placeholder="Ingrese una denominacion"
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={onClose}
          className={stylesCrearCategoria.botonCancelar}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          className={stylesCrearCategoria.botonAceptar}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCrearCategoria;
