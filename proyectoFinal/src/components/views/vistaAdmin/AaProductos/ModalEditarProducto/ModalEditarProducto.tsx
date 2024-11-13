import styleModalProducto from "./ModalEditarProducto.module.css";
import { ChangeEvent, FC, suseEffect, useState } from "react";
import { IProducto } from "../../../../../types/dtos/productos/IProductos";
import { useDispatch } from "react-redux";
import { ServiceProductos } from "../../../../../services/ServiceProductos";
import { useForm } from "../../../../../hooks/useForm";
import { IUpdateProducto } from "../../../../../types/dtos/productos/IUpdateProducto";
import { Button, Modal } from "react-bootstrap";
import addImagen from "./imagen.png";

// import { actualizarEmpresa } from '../../../../slices/empresaSlice';

interface IProsEditarProducto {
  producto: IProducto;
  visible: boolean;
  onClose: () => void;
  show: boolean
}

export const ModalEditarEmpresa: FC<IProsEditarProducto> = ({
  producto,
  visible,
  onClose,
  show
}) => {
  // dispatch para actualizar la empresa
  const dispatch = useDispatch();

  //const dispatch = useDispatch<AppDispatch>();
  const serviceProducto = new ServiceProductos();

  const { values, handleChange, resetForm } = useForm({
    denominacion: producto.denominacion,
    categoria: producto.categoria,
    alergenos: producto.alergenos,
    precioVenta: producto.precioVenta,
    codigo: producto.codigo,
    habilitado: producto.habilitado,
    descripcion: producto.descripcion,
    imagenes: producto.imagenes,
    eliminado: producto.eliminado,
  });

  const {
    denominacion,
    categoria,
    alergenos,
    precioVenta,
    codigo,
    habilitado,
    descripcion,
    imagenes,
    eliminado,
    
  } = values;

  const handleEditarProducto = async (productoEditar: IUpdateProducto) => {
    try {
      await serviceProducto.editOneProducto(productoEditar.id, productoEditar);
      dispatch(actualizarProducto(productoEditar));
    } catch (error) {
      console.error("Error editar producto: ", error);
    }
    //onAddEmpresa(newEmpresa);
  };

  const addForm = () => {
    const newEmpresa: IUpdateProducto = {
      id: producto.id,
      eliminado: false,
      denominacion: denominacion,
      categoria: categoria,
      alergenos: alergenos,
      precioVenta: precioVenta,
      codigo: codigo,
      habilitado: habilitado,
      descripcion: descripcion,
      imagenes: imagenes,
    };
    handleEditarProducto(newProducto);
    console.log(newProducto.id);
    resetForm(); // Cerrar el modal
    onClose();
  };
  const cancelForm = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const [logo, setLogo] = useState<string>("");
  // Si no está visible, no renderiza nada
  if (!visible) {
    return null;
  }
  return (
    <Modal
      className={styleModalProducto.modalContent}
      show={show}
      onHide={onClose}
    >
      <Modal.Header>
        <Modal.Title>Crear producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styleModalProducto.containerModal}>
          {/* Formulario para crear producto */}
          <div className={styleModalProducto.containerAtributes}>
            {/* Aca se ingresa la denominacion */}
            <input
              className={styleModalProducto.label}
              type="text"
              id="productDenomination"
              value={denominacion}
              placeholder="Ingresa una denominacion"
              onChange={handleChange}
            />
            {/* aca se selecciona la categoria */}
            <select
              className={styleModalProducto.label}
              id="category"
              name="categories"
            >
              <option value="">Categoria</option>
              <option value="">lacteos</option>
            </select>
            {/* Aca se seleciona un alergeno */}
            <select
              className={styleModalProducto.label}
              id="alergenos"
              name="alergenos"
            >
              <option value="">Alérgenos</option>
              <option value="">mani</option>
            </select>
            {/* Aca se ingresa el precio de venta */}
            <input
              className={styleModalProducto.label}
              type="number"
              id="priceOfProduct"
              value={precioVenta}
              placeholder="Ingrese un precio de venta"
              onChange={handleChange}
            />
            {/* Aca se ingresa el codigo del producto */}
            <input
              className={styleModalProducto.label}
              type="number"
              id="codeOfProduct"
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
                onChange={() => sethabilitado(!isHabilitado)}
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
              id="productDescription"
              value={descripcion}
              placeholder="Ingresa una descripcion"
              onChange={handleChange}
            />
            <div className={styleModalProducto.imagenContainer}>
              <input
                type="text"
                name="imagen"
                placeholder="Ingresa una imagen"
                value={logo}
                onChange={handleChange}
              />
              <img src={addImagen} alt="imagen del boton" />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={onClose}
          className={styleModalProducto.botonCancelar}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          className={styleModalProducto.botonAceptar}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
