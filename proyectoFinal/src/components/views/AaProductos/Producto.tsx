import { useState } from "react";
import ModalCrearProducto from "./ModalCrearProducto/ModalCrearProducto";


export const Producto = () => {
  // Estado para manejar la visibilidad del modal
  const [showModal, setShowModal] = useState<boolean>(false);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button onClick={handleOpenModal}>Crear producto</button>

      {/* Modal de Crear producto */}
      <ModalCrearProducto show={showModal} onClose={handleCloseModal} />
    </>
  );
};
