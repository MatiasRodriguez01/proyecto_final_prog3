import { FC, FormEvent } from "react";
import { Modal, Button } from "react-bootstrap";
import { ServiceCategorias } from "../../../../../../services/ServiceCategorias";
import { useForm } from "../../../../../../hooks/useForm";
import { ICreateCategoria } from "../../../../../../types/dtos/categorias/ICreateCategoria";
import { IEmpresa } from "../../../../../../types/dtos/empresa/IEmpresa";

import { useSelector } from "react-redux";
import { RootState } from "../../../../../../hooks/store/store";

import styles from "./ModalCrearSubcategoria.module.css";

interface ModalCrearCategoriaProps {
  empresa: IEmpresa | null,
  show: boolean;
  onClose: () => void;
}

const ModalCrearSubcategoria: FC<ModalCrearCategoriaProps> = ({ empresa, show, onClose }) => {

  // servicio de categoria
  const serviceCategoria = new ServiceCategorias()

  // categoriaActiva del store
  const categoriaActiva = useSelector((state: RootState) => state.categoria.categoriaActiva);
  // ID de la categoria activa
  const idCategoriaActiva: number = Number(categoriaActiva?.id);
  // ID de la empresa 
  const idEmpresa: number = Number(empresa?.id);

  const { values, handleChange, resetForm } = useForm({
    denominacion: "",
    IdEmpresa: idEmpresa,
    IdCategoriaPadre: idCategoriaActiva,
  })

  const handleCreateCategoria = async (categoria: ICreateCategoria) => {
    try {
      const response = await serviceCategoria.createOneCategoria(categoria)

      console.log("categoria creada: ", response);
      console.log("ID de categoria padre: ", response.idCategoriaPadre);
    } catch (error) {
      console.error("Error al crear la subCategoria, ", error)
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
        <Modal.Title>Crear SubCategoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Formulario para crear categoría */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
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
          className={styles.botonCancelar}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          className={styles.botonAceptar}
          form="categoryForm"
          onClick={addForm}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCrearSubcategoria;
