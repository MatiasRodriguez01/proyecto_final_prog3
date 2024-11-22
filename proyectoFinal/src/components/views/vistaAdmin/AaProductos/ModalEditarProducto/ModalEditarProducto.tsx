import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "../../../../../hooks/useForm";
import { ServiceProductos } from "../../../../../services/ServiceProductos";
import { ICategorias } from "../../../../../types/dtos/categorias/ICategorias";
import { IAlergenos } from "../../../../../types/dtos/alergenos/IAlergenos";
import { IImagen } from "../../../../../types/IImagen";
import { ISucursal } from "../../../../../types/dtos/sucursal/ISucursal";

import styleModalProducto from './ModalEditarProducto.module.css';
import { IProductos } from "../../../../../types/dtos/productos/IProductos";
import { IUpdateProducto } from "../../../../../types/dtos/productos/IUpdateProducto";

interface ModalEditarProductoProps {
  sucursal: ISucursal | null,
  alergenos: IAlergenos[],
  categorias: ICategorias[],
  productoAEditar: IProductos | null,
  show: boolean,
  onClose: () => void,
}

const ModalEditarProducto: React.FC<ModalEditarProductoProps> = ({
  sucursal,
  alergenos,
  categorias,
  productoAEditar,
  show,
  onClose,
}) => {
  if ((sucursal !== null) && (productoAEditar !== null)) {
    // servicios
    const serviceProductos = new ServiceProductos();


    // los valores de formulario
    const { values, handleChange, resetForm, setValues } = useForm({
      denominacion: productoAEditar?.denominacion || "",
      precioVenta: productoAEditar?.precioVenta || 0,
      descripcion: productoAEditar?.descripcion || "",
      codigo: productoAEditar?.codigo || "",
      imagen: "",
    })

    // desectruturamos los valores de [values]
    const { denominacion, precioVenta, descripcion, codigo, imagen } = values

    useEffect(() => {
      if (productoAEditar && show) {
        setValues({
          denominacion: productoAEditar.denominacion,
          precioVenta: productoAEditar.precioVenta,
          descripcion: productoAEditar.descripcion,
          codigo: productoAEditar.codigo,
          imagen: "",
        });
      }
    }, [productoAEditar, show]);

    // guardamos el id de la categorias seleccionada
    const [idCategoria, setIdCategoria] = useState(productoAEditar.categoria.id)
    // guardamos los id de los alergenos seleccionados
    const [idsAlergenos, setIdsAlergenos] = useState<number[]>([])
    // const guardamos las imagenes 
    const [imagenes, setImagenes] = useState<IImagen[]>(productoAEditar.imagenes)
    // el boton de habilitado
    const [habilitado, setHabilitado] = useState<boolean>(productoAEditar.habilitado)

    // const 
    const handleAddCategoriaId = (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(event);
      const num = (event.target.value);
      setIdCategoria(Number(num));
    }

    // funcion para guardar las imganes de producto
    const addImagen = (url: string) => {
      if (url.trim() !== "") {  // si la url no esta vacia asigna las imagenes
        const newImage: IImagen = {
          name: `Imagen ${imagenes.length + 1}`,
          url: url,
        }
        setImagenes((prevImagenes) => [...prevImagenes, newImage])
      }

      // cuando termine de asignar la imagen su valor es vacio de nuevo
      setValues({
        codigo: codigo,
        denominacion: denominacion,
        precioVenta: precioVenta,
        descripcion: descripcion,
        imagen: "",
      })
    }

    // creamos la funcion para agregar un producto
    const handleEditarProducto = async (newProducto: IUpdateProducto) => {
      try {
        const response = await serviceProductos.editOneProducto(productoAEditar.id, newProducto);
        console.log("Se edito el producto: ", response)
      } catch (error) {
        console.log("No se pudo Editar el producto: ", error)
      }
    }


    const addForm = () => {
      const newProducto: IUpdateProducto = {
        id: productoAEditar.id,
        eliminado: productoAEditar.eliminado,
        denominacion: denominacion,
        habilitado: habilitado,
        precioVenta: precioVenta,
        descripcion: descripcion,
        codigo: codigo,
        idCategoria: idCategoria,
        idAlergenos: productoAEditar.alergenos.map((alergeno) => Number(alergeno.id)),
        imagenes: imagenes,
      }
      console.log(newProducto)
      handleEditarProducto(newProducto)
      resetForm()
      onClose()
    }

    const cancelForm = () => {
      resetForm()
      onClose()
    }

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault()
      addForm()
    }

    if (!show) {
      return null
    }

    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered show={show} onHide={onClose}>
        <Modal.Header>
          <h2 style={{ textAlign: 'center' }}>Editar producto</h2>
        </Modal.Header>
        <Modal.Body style={{ height: '70vh' }}>
          <form onSubmit={handleSubmit}>
            <div className={styleModalProducto.containerModal}>
              {/* Formulario para crear producto */}
              <div className={styleModalProducto.containerAtributes}>
                {/* Aca se ingresa la denominacion */}
                <input
                  className={styleModalProducto.label}
                  type="text"
                  name="denominacion"
                  value={denominacion}
                  placeholder="Ingresa una denominacion"
                  onChange={handleChange}
                />
                {/* aca se selecciona la categoria */}
                <select
                  className={styleModalProducto.label}
                  name="idCategoria"
                  value={idCategoria}
                  onChange={(e) => handleAddCategoriaId(e)}
                >
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.denominacion}</option>
                  ))}
                </select>
                {/* Aca se seleciona un alergeno */}
                <select
                  className="form-select"
                  name="idsAlergenos"
                  multiple
                  value={idsAlergenos.map(String)} // Los valores deben coincidir con el tipo string para el select
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
                    setIdsAlergenos(selectedOptions); // Guarda los IDs seleccionados
                  }}
                >
                  <option selected >Lista de Alergenos</option>
                  {alergenos.map((alergeno) => (
                    <option key={alergeno.id} value={alergeno.id}>
                      {alergeno.denominacion}
                    </option>
                  ))}
                </select>

                {/* Aca se ingresa el precio de venta */}
                <input
                  className={styleModalProducto.label}
                  type="number"
                  name="precioVenta"
                  value={precioVenta}
                  placeholder="Ingrese un precio de venta"
                  onChange={handleChange}
                />
                {/* Aca se ingresa el codigo del producto */}
                <input
                  className={styleModalProducto.label}
                  type="text"
                  name="codigo"
                  value={values.codigo}
                  placeholder="Ingrese el codigo del producto"
                  onChange={handleChange}
                />
                {/* Checkbox de habilitación */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <input
                    className={styleModalProducto.nosee}
                    type="checkbox"
                    checked={habilitado}
                    onChange={(e) => setHabilitado(e.target.checked)}
                    style={{
                      width: "20px",
                      height: "20px",
                      accentColor: "#b0413e",
                      marginRight: "8px",
                    }}
                  />
                  Habilitado
                </label>
              </div>
              <div className={styleModalProducto.segundoDiv}>
                {/* Aca se ingresa la descripcion */}
                <input
                  className={styleModalProducto.label}
                  type="text"
                  name="descripcion"
                  value={descripcion}
                  placeholder="Ingresa una descripcion"
                  onChange={handleChange}
                />

                <div className={styleModalProducto.imagenContainer}>
                  <input

                    className={styleModalProducto.label}
                    type="text"
                    name="imagen"
                    placeholder="Ingresa una imagen"
                    value={imagen}
                    onChange={handleChange}
                  />
                  <Button
                    style={{ float: 'left', width: 'auto' }}
                    onClick={() => addImagen(imagen)}>
                    Agregar Imagen
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={cancelForm}
            className={styleModalProducto.botonCancelar}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={addForm}
            className={styleModalProducto.botonAceptar}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalEditarProducto;
