import { FC, FormEvent } from "react";
import { Modal, Button } from "react-bootstrap";
import { ServiceCategorias } from "../../../../../services/ServiceCategorias";
import { useForm } from "../../../../../hooks/useForm";
import { IEmpresa } from "../../../../../types/dtos/empresa/IEmpresa";

import styles from "./ModalCrearCategoria.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { IUpdateCategoria } from "../../../../../types/dtos/categorias/IUpdateCategoria";

interface ModalEditarSubcategoriaProps {
  empresa: IEmpresa | null,
  show: boolean;
  onClose: () => void;
  categoria?: any;
}

const ModalEditarSubcategoria: FC<ModalEditarSubcategoriaProps> = ({ empresa, show, onClose }) => {

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

  const handleCreateCategoria = async (categoria: IUpdateCategoria) => {
    try {
      const response = await serviceCategoria.editOneCategoria(idCategoriaActiva, categoria)

      console.log(response.id)

      console.log("ID de la subCategoria creada: ", categoria.idEmpresa)
    } catch (error) {
      console.error("Error al crear la subCategoria, ", error)
    }
  }

  const addForm = () => {
    if (empresa !== null) {
      const newCategoria: IUpdateCategoria = {
        id: 0,
        eliminado: false,
        idSucursales: [0, 1, 2],
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
              placeholder="Ingrese una denominacion"
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

export default ModalEditarSubcategoria;
