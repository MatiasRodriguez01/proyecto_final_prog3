import { FC, useState } from "react";
import { ICategoria } from "../../../../../interfaces/ICategoria";
import { Modal, Form, Button } from "react-bootstrap";

interface ModalCrearSubCategoriaProps {
  mostrar: boolean;
  onClose: () => void;
  categorias: ICategoria[];
  onSave: (subcategoria: { nombre: string; IdCategoriaPadre: number }) => void;
}

export const ModalCrearSubCategoria: FC<ModalCrearSubCategoriaProps> = ({
  mostrar,
  onClose,
  categorias,
  onSave,
}) => {
  // Estados para el formulario
  const [nombreSubcategoria, setNombreSubCategoria] = useState<string>("");
  const [categoriaPadreId, setCategoriaPadreId] = useState<number | null>(null);

  // Maneja el envío del formulario
  const handleSubmit = () => {
    if (!nombreSubcategoria || !categoriaPadreId) {
      alert("Ingrese los datos");
      return;
    }

    // Guardar la subcategoría
    onSave({
      nombre: nombreSubcategoria,
      IdCategoriaPadre: categoriaPadreId,
    });

    // Cierra el modal después de guardar
    onClose();
  };

  return (
    <Modal show={mostrar} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear/Editar Subcategoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la subcategoría"
              value={nombreSubcategoria}
              onChange={(e) => setNombreSubCategoria(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="parentCategory" className="mb-3">
            <Form.Label>Categoría Padre</Form.Label>
            <Form.Control
              as="select"
              value={categoriaPadreId ?? ""}
              onChange={(e) => setCategoriaPadreId(Number(e.target.value))}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.denominacion}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar Subcategoría
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
