import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import styles from "./Producto.module.css";
import { IProductos } from "../../../../types/dtos/productos/IProductos";
import { ServiceProductos } from "../../../../services/ServiceProductos";
import { useDispatch, useSelector } from "react-redux";
import {
  editarProducto,
  guardarProductos,
} from "../../../../slices/productoSlice";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { ServiceCategorias } from "../../../../services/ServiceCategorias";
import { guardarCategorias } from "../../../../slices/categoriaSlice";

import { RootState } from "../../../../hooks/store/store";
import ModalEditarProducto from "./ModalEditarProducto/ModalEditarProducto";
import ModalCrearProducto from "./ModalCrearProducto/ModalCrearProducto";
import { sucursalActiva } from "../../../../slices/sucursalSlice";

export const Producto = () => {
  // dispatch
  const dispatch = useDispatch();

  // servicio
  const serviceProducto = new ServiceProductos();
  const serviceCategorias = new ServiceCategorias();

  const [subCategorias, setSubcategorias] = useState<ICategorias[]>([]);

  const [subcategoriaSelect, setSubcategoriaSelect] = useState<string>("");

  // sucursales
  const sucursal = useSelector(
    (state: RootState) => state.sucursal.sucursalActiva
  );

  // Estado para manejar la visibilidad del modalCrearProducto
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleOpenModal = () => {
    setShowModal(!showModal);
  };

  // estado para manejar la visibilidad del modalEditarProducto
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const handleEditModal = (p: IProductos) => {
    dispatch(editarProducto(null));
    dispatch(editarProducto(p));
    console.log("Se creo el producto activo: ", productoAEditar);
    setShowEditModal(!showEditModal);
  };

  // const producto editado
  const productoAEditar = useSelector(
    (state: RootState) => state.producto.productoEditado
  );

  useEffect(() => {
    console.log("producto activo: ", productoAEditar);
  }, [productoAEditar]);

  const [productos, setProductos] = useState<IProductos[]>([]); // creamos productos
  useEffect(() => {
    // creamos los productos de categorias
    const fetchProductos = async () => {
      try {
        if (sucursal) {
          const productosDelServicio =
            await serviceProducto.getAllProductosPorSucursal(sucursal?.id);
          setProductos(productosDelServicio);
          dispatch(guardarProductos(productosDelServicio));
        }
      } catch (error) {
        console.log("Error al renderizar los productos: ", error);
      }
    };
    fetchProductos();
  }, [productos]);

  const handleSubcategoriaChange = async () => {
    try {
      if (sucursal) {
        const response = await serviceCategorias.getAllSubcategoriasPorSucursal(
          sucursal.id
        );

        console.log(response);

        setSubcategorias(response);
      }
    } catch (error) {
      console.error("Error trayendo subcategorias", error);
    }
  };

  const handleDeleteProducto = async (id: number) => {
    try {
      await serviceProducto.deleteProductoById(id); // Llama al servicio para eliminar
      alert("Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("Hubo un error al eliminar el producto.");
    }
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <h2 className={styles.title}> Productos</h2>
      <div className={styles.containerButtonCrear}>
        <button className={styles.buttonCrear} onClick={handleOpenModal}>
          <h5 className={styles.buttonCrearH2}>crear producto</h5>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
      <div className={styles.containerDiv}>
        <h4>Filtrar por categoria: </h4>
        <select
          name="categorias"
          value={subcategoriaSelect}
          onChange={handleSubcategoriaChange}
          required
        >
          <option value="">Seleccione una Categoria</option>
          {subCategorias.map((subcategoria) => (
            <option key={subcategoria.id} value={subcategoria.id}>
              {subcategoria.denominacion}
            </option>
          ))}
        </select>
      </div>

      <div style={{ width: "100%" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Categoria</th>
              <th>Habilitado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos &&
              productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.denominacion}</td>
                  <td>{producto.precioVenta}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.categoria.denominacion}</td>
                  <td className={styles.boton}>
                    <Button
                      variant="outline-success"
                      // style={{ width: '5vw' }}
                    >
                      <span className="material-symbols-outlined">
                        thumb_up
                      </span>
                    </Button>
                  </td>
                  <td style={{ width: "auto" }}>
                    <div className={styles.buttonsContainer}>
                      <Button
                        // style={{ width: '5vw' }}
                        variant="outline-warning"
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{
                            width: "auto",
                            height: "auto",
                            textAlign: "center",
                          }}
                        >
                          visibility
                        </span>
                      </Button>
                      <Button
                        onClick={() => handleEditModal(producto)}
                        variant="outline-primary"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </Button>
                      <Button
                        // style={{width: '5vw'}}
                        variant="outline-danger"
                        onClick={() => handleDeleteProducto(producto.id)}
                      >
                        <span
                          style={{
                            width: "auto",
                            height: "auto",
                            textAlign: "center",
                          }}
                          className="material-symbols-outlined"
                        >
                          delete_forever
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <ModalCrearProducto
        sucursal={sucursal}
        show={showModal}
        onClose={() => setShowModal(false)}
      />

      <ModalEditarProducto
        sucursal={sucursal}
        productoAEditar={productoAEditar}
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
    </>
  );
};
