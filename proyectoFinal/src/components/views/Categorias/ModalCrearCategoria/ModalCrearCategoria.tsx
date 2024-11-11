import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

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
  const [categoryDescription, setCategoryDescription] = useState<string>("");

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (!categoryName) {
      alert("Por favor ingrese el nombre de la categoría.");
      return;
    }

    // Aquí podrías agregar la lógica para guardar la nueva categoría
    console.log("Categoría creada:", { categoryName, categoryDescription });

    // Llamada para cerrar el modal después de guardar la categoría
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Formulario para crear categoría */}
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">
            Nombre de la Categoría
          </label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryDescription" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="categoryDescription"
            rows={3}
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar Categoría
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCrearCategoria;
