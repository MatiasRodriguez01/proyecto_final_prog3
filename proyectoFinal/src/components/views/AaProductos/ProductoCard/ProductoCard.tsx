import { Button, Card } from "react-bootstrap";
import { FC } from "react";
import { IProducto } from "../../../../types/dtos/productos/IProductos";
import stylesProductoCard from "./ProductoCard.module.css";
import { usePopUpVisible } from "../../../../hooks/usePopUpVisible";

interface ProductoCardProps {
  producto: IProducto
  onVerProducto: () => void
  onProductoActiva: Function
}

export const ProductoCard: FC<ProductoCardProps> = ({ producto, onVerProducto, onProductoActiva }) => {

  const { isPopUpVisible, HandlePopUp } = usePopUpVisible();

  return (
    <>
      <Card onClick={() => onProductoActiva(producto.id)} className={stylesProductoCard.card}>
        <Card.Body className={stylesProductoCard.bodyContainer}>
          <Card.Title style={{ height: "auto", margin: "0" }}>
            {producto.nombre}
          </Card.Title>
          <div className={stylesProductoCard.buttonContainer}>
            <Button
              variant="outline-primary"
              className={stylesProductoCard.buttonCard}
              onClick={onVerProducto}
            >
              <span
                className="material-symbols-outlined"
                style={{ width: 'auto', height: "auto", textAlign: "center" }}
              >
                visibility
              </span>
            </Button>
            <Button
              variant="outline-danger"
              className={stylesProductoCard.buttonCard}
            >
              <span style={{ width: 'auto', height: "auto", textAlign: "center" }} className="material-symbols-outlined">delete_forever</span>
            </Button>
            <Button
              variant="outline-success"
              className={stylesProductoCard.buttonCard}
              onClick={HandlePopUp}>
              <span className="material-symbols-outlined">
                edit
              </span>
            </Button>
          </div>
        </Card.Body>
      </Card>

      <ModalEditarProducto producto={producto} visible={isPopUpVisible} onClose={HandlePopUp} />
    </>
  );
};

export default ProductoCard;
