import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import stylesCrearProducto from "./ModalCrearProducto.module.css";

interface ModalCrearProductoProps {
  show: boolean;
  onClose: () => void;
  producto?: any;
}

const ModalCrearProducto: React.FC<ModalCrearProductoProps> = ({
  show,
  onClose,
}) => {
  // Estado para manejar los valores del formulario
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  // const [productAlergeno, setProductAlergeno] = useState<string>("");


  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (!productName) {
      alert("Por favor ingrese el nombre del producto.");
      return;
    }

    // Aquí podrías agregar la lógica para guardar el nuevo producto
    console.log("Producto cargado:", { productName, productDescription });

    // Llamada para cerrar el modal después de guardar la categoría
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Crear producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Formulario para crear producto */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="productName"
            value={productName}
            placeholder="Ingrese una denominacion"
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            id="productDescription"
            value={productDescription}
            placeholder="Ingrese una descripcion"
            onChange={(e) => setProductDescription(e.target.value)}
          />
          {/* aca se selecciona la categoria */}
          <select id="category" name="categories">
            <option value="">Selecciona una categoria</option>
            <option value="">(categoria)</option>
          </select>
          <select id="alergenos" name="alergenos">
            <option value="">Selecciona un alérgeno</option>
            <option value=""></option>
          </select>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={onClose}
          className={stylesCrearProducto.botonCancelar}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          className={stylesCrearProducto.botonAceptar}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCrearProducto;
