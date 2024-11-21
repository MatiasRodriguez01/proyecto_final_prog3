import { FC, FormEvent } from "react";
import { Modal, Button } from "react-bootstrap";
import { ServiceCategorias } from "../../../../../../services/ServiceCategorias";
import { useForm } from "../../../../../../hooks/useForm";
import { ICreateCategoria } from "../../../../../../types/dtos/categorias/ICreateCategoria";
import { IEmpresa } from "../../../../../../types/dtos/empresa/IEmpresa";

import stylesCrearCategoria from "./ModalCrearCategoria.module.css";

interface ModalCrearCategoriaProps {
  empresa: IEmpresa | null,
  show: boolean;
  onClose: () => void;
  categoria?: any;
}

const ModalCrearCategoria: FC<ModalCrearCategoriaProps> = ({ empresa, show, onClose }) => {

  const serviceCategoria = new ServiceCategorias()

  const { values, handleChange, resetForm } = useForm({
    denominacion: "",
    IdEmpresa: 0,
    IdCategoriaPadre: null,
  })

  const handleCreateCategoria = async (categoria: ICreateCategoria) => {
    try {
      const response = await serviceCategoria.createOneCategoria(categoria)

      console.log(response.id)

      console.log("ID de categoria creada: ", categoria.idEmpresa)
    } catch (error) {
      console.error("Error creando categoria, ", error)
    }
  }

  const addForm = () => {
    if (empresa !== null) {
      const newCategoria: ICreateCategoria = {
        denominacion: values.denominacion,
        idCategoriaPadre: values.IdCategoriaPadre,
        idEmpresa: empresa.id
      }

      handleCreateCategoria(newCategoria)
      resetForm()
      onClose()
    }
  }

  const cancelForm = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addForm()
  }

  if (!show) {
    return null;
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header >
        <Modal.Title>Crear/Editar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bodyModal">
        {/* Formulario para crear categoría */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control inputAlignLeft"
              id="categoryName"
              name="denominacion"
              value={values.denominacion}
              placeholder="Denominacion"
              onChange={handleChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={cancelForm}
          className={stylesCrearCategoria.botonCancelar}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          className={stylesCrearCategoria.botonAceptar}
          form="categoryForm"
          onClick={addForm}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCrearCategoria;
