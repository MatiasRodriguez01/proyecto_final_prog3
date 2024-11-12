import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import stylesCrearCategoria from "./ModalCrearCategoria.module.css";
import { ServiceCategorias } from "../../../../services/ServiceCategorias";
import { useForm } from "../../../../hooks/useForm";
import { ICreateCategoria } from "../../../../types/dtos/categorias/ICreateCategoria";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";

interface ModalCrearCategoriaProps {empresa: IEmpresa,
  visible: boolean;
  onClose: () => void;
  categoria?: any;
}

const ModalCrearCategoria: FC<ModalCrearCategoriaProps> = ({empresa,
  visible,
  onClose,
}) => {

  const serviceCategoria = new ServiceCategorias()

  const [categoriaId, setCategoriaId] = useState(0)

  const {values, handleChange, resetForm} = useForm({
    denominacion: "",
    IdEmpresa: 0,
    IdCategoriaPadre: null,
  })

  const handleCreateCategoria = async (categoria: ICreateCategoria) => {
    try{
      const response = await serviceCategoria.createOneCategoria(categoria)

      setCategoriaId(response.id)
    }catch(error){
      console.error("Error creando categoria, ", error)
    }
  }

  const addForm = () => {
    const newCategoria : ICreateCategoria = {
      denominacion: values.denominacion,
      idCategoriaPadre: values.IdCategoriaPadre,
      idEmpresa: empresa.id
    }

    handleCreateCategoria(newCategoria)
    resetForm()
    onClose()
  }

  const cancelForm = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addForm()
  }

  if (!visible){
    return null;
  }

  return (
    <Modal show={visible} onHide={onClose}>
      <Modal.Header >
        <Modal.Title>Crear/Editar Categoría</Modal.Title>
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
          className={stylesCrearCategoria.botonCancelar}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          className={stylesCrearCategoria.botonAceptar}
          form="categoryForm"
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCrearCategoria;
