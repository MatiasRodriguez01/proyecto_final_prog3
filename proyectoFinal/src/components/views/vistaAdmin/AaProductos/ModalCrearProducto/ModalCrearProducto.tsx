import React, { ChangeEvent, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import stylesCrearProducto from "./ModalCrearProducto.module.css";
//import addImagen from "./imagen.png";
import { useForm } from "../../../../../hooks/useForm";
import styleModalProducto from "./ModalCrearProducto.module.css";
import { ICategorias } from "../../../../../types/dtos/categorias/ICategorias";
import { IAlergenos } from "../../../../../types/dtos/alergenos/IAlergenos";
import { IImagen } from "../../../../../types/IImagen";
import { ICreateProducto } from "../../../../../types/dtos/productos/ICreateProducto";
import { ServiceProductos } from "../../../../../services/ServiceProductos";
import { ISucursal } from "../../../../../types/dtos/sucursal/ISucursal";

interface ModalCrearProductoProps {
  sucursal: ISucursal | null,
  show: boolean;
  categorias: ICategorias[];
  alergenos: IAlergenos[];
  onClose: () => void;
}

const ModalCrearProducto: React.FC<ModalCrearProductoProps> = ({ sucursal, show, categorias, alergenos, onClose }) => {
  if (sucursal !== null) {

    
    const serviceProductos = new ServiceProductos();

    // los valores de formulario
    const { values, handleChange, resetForm, setValues } = useForm({
      denominacion: "",
      precioVenta: 0,
      descripcion: "",
      codigo: "",
      imagen: "",
    })

    // guardamos el id de la categorias seleccionada
    const [idCategoria, setIdCategoria] = useState(0);
    // guardamos los id de los alergenos seleccionados
    const [idsAlergenos, setIdsAlergenos] = useState<number[]>([])
    // const guardamos las imagenes 
    const [imagenes, setImagenes] = useState<IImagen[]>([])
    // el boton de habilitado
    const [habilitado, setHabilitado] = useState<boolean>(false)

    // const 
    const handleAddCategoriaId = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const num: number = Number(event.target.value);
      if (idCategoria === 0){
        alert('Agrege una categoria por favor!!')
        return 
      } else {
        setIdCategoria(num)
      }
    }

    // desectruturamos los valores de [values]
    const { denominacion, precioVenta, descripcion, codigo, imagen } = values

    // funcion para guardar las imganes de producto
    const addImagen = (url: string) => {
      if (url.trim() !== "") {  // si la url no esta vacia asigna las imagenes
        const newImage: IImagen = {
          name: `Imagen ${imagenes.length + 1}`,
          url: String(url),
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
    const handleCrearProducto = async (producto: ICreateProducto) => {
      try {
        // if (idCategoria === 0){
        //   alert('Agrege una categoria por favor!!')
        //   return 
        // }
        const response = await serviceProductos.createOneProducto(producto);
        console.log("Se creo el producto: ", response)
      } catch (error) {
        console.log("No se pudo crear el producto: ", error)
      }
    }


    const addForm = () => {
      const newProducto: ICreateProducto = {
        denominacion: denominacion,
        habilitado: habilitado,
        precioVenta: precioVenta,
        descripcion: descripcion,
        codigo: codigo,
        idCategoria: idCategoria === 0 ? categorias[0].id : idCategoria,
        idAlergenos: idsAlergenos,
        imagenes: imagenes
      }
      handleCrearProducto(newProducto)
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
          <h2 style={{ textAlign: 'center' }}>Crear producto</h2>
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
                  {/* <option value="">Categoria</option> */}
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
                  <option value="" disabled >Lista de Alergenos</option>
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
                  value={codigo}
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
            className={stylesCrearProducto.botonCancelar}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={addForm}
            className={stylesCrearProducto.botonAceptar}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalCrearProducto;
