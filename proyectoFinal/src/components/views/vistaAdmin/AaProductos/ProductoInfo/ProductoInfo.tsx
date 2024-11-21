import { FC } from 'react'
import { IProductos } from '../../../../../types/dtos/productos/IProductos'
import styleInfo from './ProductoInfo.module.css'
import { Carousel } from 'react-bootstrap';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import { IImagen } from '../../../../../types/IImagen';


interface IPropsProductoInfo {
    producto: IProductos | null,
    show: boolean,
    onClose: () => void,
}

export const ProductoInfo: FC<IPropsProductoInfo> = ({ producto, show, onClose }) => {

    if (producto) {

        const imagenes: IImagen[] = producto.imagenes;

        if (!show) return null;

        return (
            <div className={styleInfo.containerPopInfo}>
                <div className={styleInfo.container} style={{ overflowY: 'scroll' }}>
                    <div className="card" style={{ width: "40vw" }}>
                        <div className="card-body">
                            <h5 className="card-title" style={{ textAlign: 'center' }}>Producto</h5>
                            <hr />
                            <p className="card-text"><strong>Nombre:</strong> {producto.denominacion}</p>
                            <p className="card-text"><strong>Precio: </strong> ${producto.precioVenta}</p>
                            <p className="card-text"><strong>Codigo: </strong> {producto.codigo}</p>
                            <p className="card-text"><strong>Descripcion:</strong> {producto.descripcion}</p>
                            <hr />
                            {
                                (
                                    imagenes && imagenes.map((imagen, index) => (
                                        <Carousel key={imagen.id}>
                                            <Carousel.Item>
                                                <img style={{width:'100%'}} src={imagen.url} alt={imagen.name} />
                                                {/* <ExampleCarouselImage uselImage text="First slide" /> */}
                                                <Carousel.Caption>
                                                    <h3>Imagen N°{index + 1}</h3>
                                                    <p>{imagen.name}</p>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                        </Carousel>
                                    ))
                                )

                            }
                            <hr />
                            <button className="btn btn-primary" onClick={onClose} style={{ height: 'auto' }}>Cerrar</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
