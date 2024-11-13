import React, { FormEvent, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import stylesCrearProducto from "./ModalCrearProducto.module.css";
import { ICategoria } from "../../../../interfaces/ICategoria";
import { IAlergeno } from "../../../../interfaces/IAlergeno";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import { ServiceProductos } from "../../../../services/ServiceProductos";
import { useForm } from "../../../../hooks/useForm";
import { ICreateProducto } from "../../../../types/dtos/productos/ICreateProducto";
import { IImagen } from "../../../../types/IImagen";

interface ModalCrearProductoProps {
  categoria: ICategorias,
  alergenos: IAlergenos,
  visible: boolean;
  onClose: () => void;
  producto?: any;
}

const ModalCrearProducto: React.FC<ModalCrearProductoProps> = ({
  categoria,
  alergenos,
  visible,
  onClose,
}) => {
  const serviceProducto = new ServiceProductos()

  const [productoId, setProductoId] = useState(0)

  const {values, handleChange, resetForm} = useForm({
    denominacion: "",
    precioVenta: 0,
    descripcion: "",
    habilitado: false,
    codigo: "",
    idCategoria: 0,
    idAlergenos: 0,
    imagenes: "",
  })

  const [idAlergenos, setIdAlergenos] = useState<number[]>([])

  const [imagenes, setImagenes] = useState<IImagen[]>([])

  const handleCreateProducto = async (producto: ICreateProducto) => {
    try{
      const response = await serviceProducto.createOneProducto(producto)

      setProductoId(response.id)
    }catch(error){
      console.error("Error creando categoria, ", error)
    }
  }

  const addForm = () => {
    const newProducto : ICreateProducto = {
      denominacion: values.denominacion,
      precioVenta: values.precioVenta,
      descripcion: values.descripcion,
      habilitado: values.habilitado,
      codigo: values.codigo,
      idCategoria: categoria.id,
      idAlergenos: idAlergenos,
      imagenes: imagenes,
    }

    handleCreateProducto(newProducto)
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
      <Modal.Header>
        <Modal.Title>Crear producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Formulario para crear producto */}
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="productName"
            name="denominacion"
            value={values.denominacion}
            placeholder="Ingrese una denominacion"
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control"
            id="productDescription"
            name="descripcion"
            value={values.descripcion}
            placeholder="Ingrese una descripcion"
            onChange={handleChange}
          />
          {/* aca se selecciona la categoria */}
          <select id="category" name="categories" onChange={handleChange}>
            <option value="">Selecciona una categoria</option>
            <option value="">(categoria)</option>
          </select>
          <select id="alergenos" name="alergenos" onChange={handleChange}>
            <option value="">Selecciona un alérgeno</option>
            <option value=""></option>
          </select>

        </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={cancelForm}
          className={stylesCrearProducto.botonCancelar}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          className={stylesCrearProducto.botonAceptar}
          form="productForm"
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCrearProducto;
