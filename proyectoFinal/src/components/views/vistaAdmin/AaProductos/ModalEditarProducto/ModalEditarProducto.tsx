import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import stylesCrearProducto from "./ModalCrearProducto.module.css";
import addImagen from "./imagen.png";
import { useForm } from "../../../../../hooks/useForm";
import styleModalProducto from "./ModalCrearProducto.module.css";
import { ServiceProductos } from "../../../../../services/ServiceProductos";
import { ICategorias } from "../../../../../types/dtos/categorias/ICategorias";
import { IAlergenos } from "../../../../../types/dtos/alergenos/IAlergenos";
import { IImagen } from "../../../../../types/IImagen";
import { ICreateProducto } from "../../../../../types/dtos/productos/ICreateProducto";
import { ServiceCategorias } from "../../../../../services/ServiceCategorias";
import { ServiceAlergenos } from "../../../../../services/ServiceAlergenos";
import { ISucursal } from "../../../../../types/dtos/sucursal/ISucursal";
import { IProductos } from "../../../../../types/dtos/productos/IProductos";
import { IUpdateProducto } from "../../../../../types/dtos/productos/IUpdateProducto";

interface ModalEditarProductoProps {sucursal: ISucursal,
  categoria: ICategorias,
  producto: IUpdateProducto,
  id: number;
  show: boolean;
  onClose: () => void;
}

const ModalEditarProducto: React.FC<ModalEditarProductoProps> = ({sucursal, categoria, producto,
  id,
  show,
  onClose,
}) => {
  const serviceProducto = new ServiceProductos()

  const serviceCategorias = new ServiceCategorias()

  const serviceAlergenos = new ServiceAlergenos()

  const {values, handleChange, resetForm} = useForm({
    denominacion: producto.denominacion,
    precioVenta: producto.precioVenta,
    descripcion: producto.descripcion,
    codigo: producto.codigo,
  })

  const [idCategoria, setIdCategoria] = useState(producto.idCategoria)
  const [idsAlergenos, setIdsAlergenos] = useState<number[]>(producto.idAlergenos)
  const [imagenes, setImagenes] = useState<IImagen[]>(producto.imagenes)
  const [inputValue, setInputValue] = useState<string>("")
  const [habilitado, setHabilitado] = useState<boolean>(producto.habilitado)
  const [subCategorias, setSubCategorias] = useState<ICategorias[]>([])
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([])

  const {denominacion, precioVenta, descripcion, codigo} = values

  const addImagen = (url:string) => {
    if(url.trim() != ""){
      const newImage: IImagen = {
        name: `Imagen ${imagenes.length + 1}`,
        url : url,
      }
      setImagenes((prevImagenes) => [...prevImagenes, newImage])
    }

    setInputValue("")
  }


  const handleEditProducto = async(producto: IUpdateProducto) => {
    try{
      const response = await serviceProducto.editOneProducto(producto.id, producto)
    }catch(error){
      console.error("Error al editar producto: ", error)
    }
  }

  const addForm = () => {
    const newProducto: IUpdateProducto = {
      id: producto.id,
      denominacion: denominacion,
      habilitado: habilitado,
      precioVenta: precioVenta,
      descripcion: descripcion,
      codigo: codigo,
      idCategoria: idCategoria,
      idAlergenos: idsAlergenos,
      imagenes: imagenes
    }

    handleEditProducto(newProducto)

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

  if (!show){
    return null
  }

  useEffect(() => {
    const fetchCategoriasyAlergenos = async () => {
      try{
        const responseCategorias = await serviceCategorias.getAllSubcategoriasPorCategoriaPadre(sucursal.id, categoria.id)

        const responseAlergenos = await serviceAlergenos.getAllAlergenos()

        setSubCategorias(responseCategorias)
        
        setAlergenos(responseAlergenos)
      }catch(error){
        console.error("error al traer alergenos y/o subcategorias")
      }
    }

    fetchCategoriasyAlergenos()
  }, [])

  return (
    <Modal className={styleModalProducto.modalContent} show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Editar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              onChange={(e) => setIdCategoria(Number(e.target.value))}
            >
              <option value="">Categoria</option>
              {subCategorias.map((subCategoria) => (
                <option key={subCategoria.id} value={subCategoria.id}>{subCategoria.denominacion}</option>
              ))}
            </select>
            {/* Aca se seleciona un alergeno */}
            <select
              className={styleModalProducto.label}
              name="idsAlergenos"
              multiple
              value={idsAlergenos.map(String)}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value))
                setIdsAlergenos(selectedOptions)}
              }
            >
              <option value="">Alergenos</option>
              {alergenos.map((alergeno) => (
                <option key={alergeno.id} value={alergeno.id}>{alergeno.denominacion}</option>
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
              type="number"
              name="codigoProducto"
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
          <div>
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
                placeholder="Ingresa una imagen o para eliminar ingresa 'eliminar:Imagen {numero de imagen}'"
                value={inputValue}
                onChange={(e) => {
                  const url = e.target.value.trim()
                  if(url.startsWith('eliminar: ')){
                    const nameToDelete = url.replace('eliminar:','').trim()
                    setImagenes((prevImagenes) => prevImagenes.filter((img) => img.name !== nameToDelete)) 
                  }else if (url !== "") {
                    const newImage: IImagen = {
                      name: `Imagen ${imagenes.length + 1}`, 
                      url: url,
                    };
                    setImagenes((prevImagenes) => [...prevImagenes, newImage]); 
                  }
                  setInputValue(""); 
                }}
              />
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
};

export default ModalEditarProducto;
