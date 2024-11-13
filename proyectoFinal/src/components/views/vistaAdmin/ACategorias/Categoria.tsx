import { useState } from "react";
import ModalCrearCategoria from "./CategoriaPadre/ModalCrearCategoria/ModalCrearCategoria";

export const Categoria = () => {
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
      <button onClick={handleOpenModal}>Crear Categoría</button>

      {/* Modal de Crear Categoría */}
      <ModalCrearCategoria show={showModal} onClose={handleCloseModal} />
    </>
  );
};
