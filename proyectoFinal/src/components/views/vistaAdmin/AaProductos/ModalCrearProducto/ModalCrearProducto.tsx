import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import stylesCrearProducto from "./ModalCrearProducto.module.css";
import addImagen from "./imagen.png";
import { useForm } from "../../../../../hooks/useForm";
import styleModalProducto from "./ModalCrearProducto.module.css";

interface ModalCrearProductoProps {
  show: boolean;
  onClose: () => void;
  producto?: any;
}

const ModalCrearProducto: React.FC<ModalCrearProductoProps> = ({
  show,
  onClose,
}) => {
  // Estado para manejar los valores del formulario
  const [productDenomination, setProductDenomination] = useState<string>("");
  const [precioVenta, setPrecioVenta] = useState<number>();
  const [codigoProducto, setCodigoProducto] = useState<number>();
  const [isHabilitado, setIsHabilitado] = useState<boolean>(false);
  const [productDescription, setProductDescription] = useState<string>("");
  const [logo, setLogo] = useState<string>("");


  const { handleChange } = useForm({});

  //const [productAlergeno, setProductAlergeno] = useState<string>("");

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (!productDenomination) {
      alert("Por favor ingrese el nombre del producto.");
      return;
    }

    // Aquí podrías agregar la lógica para guardar el nuevo producto
    console.log("Producto cargado:", {
      productDenomination,
      isHabilitado,
    });

    // Llamada para cerrar el modal después de guardar la categoría
    onClose();
  };

  return (
    <Modal className={styleModalProducto.modalContent} show={show} onHide={onClose}>
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
              value={productDenomination}
              placeholder="Ingresa una denominacion"
              onChange={(e) => setProductDenomination(e.target.value)}
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
              value={codigoProducto}
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
                checked={isHabilitado}
                onChange={() => setIsHabilitado(!isHabilitado)}
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
              value={productDescription}
              placeholder="Ingresa una descripcion"
              onChange={(e) => setProductDescription(e.target.value)}
            />

            <div className={styleModalProducto.imagenContainer}>
              <input

                className={styleModalProducto.label}
                type="text"
                name="imagen"
                placeholder="Ingresa una imagen"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
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
          className={stylesCrearProducto.botonCancelar}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          className={stylesCrearProducto.botonAceptar}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCrearProducto;
