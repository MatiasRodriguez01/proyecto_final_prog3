import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import styles from "./Producto.module.css";
import { IProductos } from "../../../../types/dtos/productos/IProductos";
import { ServiceProductos } from "../../../../services/ServiceProductos";
import { useDispatch, useSelector } from "react-redux";
import {
  editarProducto,
  guardarProductos,
  productoActivo,
} from "../../../../slices/productoSlice";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { ServiceCategorias } from "../../../../services/ServiceCategorias";
import { guardarCategorias } from "../../../../slices/categoriaSlice";

import { RootState } from "../../../../hooks/store/store";
import ModalEditarProducto from "./ModalEditarProducto/ModalEditarProducto";
import ModalCrearProducto from "./ModalCrearProducto/ModalCrearProducto";
import { sucursalActiva } from "../../../../slices/sucursalSlice";
import { IUpdateProducto } from "../../../../types/dtos/productos/IUpdateProducto";
import { ProductoInfo } from "./ProductoInfo/ProductoInfo";

export const Producto = () => {
  // dispatch
  const dispatch = useDispatch();

  // servicio
  const serviceProducto = new ServiceProductos();
  const serviceCategorias = new ServiceCategorias();

  const [subCategorias, setSubcategorias] = useState<ICategorias[]>([]);

  const [productosFiltrados, setProductosFiltrados] = useState<IProductos[]>([]);

  const [habilitado, setHabilitado] = useState<boolean>(false)

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
  }, [sucursal]);


  const [selectedSubcategoriaId, setSelectedSubcategoriaId] = useState<string>('');
  const handleSubcategoriaChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategoriaId(e.target.value);
    console.log("sucursal activa: ", sucursal)
    console.log("valor seleccionado: ", selectedSubcategoriaId)
  };

  useEffect(() => {
    const fetchSubCategorias = async () => {
      try {
        if (sucursal) {
          const response = await serviceCategorias.getAllSubcategoriasPorSucursal(sucursal.id);
          setSubcategorias(response)
        }
      } catch (error) {
        console.error("Error trayendo subcategorias", error);
      }
    }
    fetchSubCategorias();
  }, [subCategorias, setSubcategorias]);

  // Filtrar productos cuando la subcategoría cambia
  useEffect(() => {
    if (selectedSubcategoriaId) {
      const productosFiltradosPorCategoria = productos.filter(producto => producto.categoria.id === parseInt(selectedSubcategoriaId));
      setProductosFiltrados(productosFiltradosPorCategoria);
    } else {
      setProductosFiltrados(productos); // Si no hay categoría seleccionada, mostrar todos los productos
    }
  }, [productos]);

  const handleDeleteProducto = async (id: number) => {
    try {
      await serviceProducto.deleteProductoById(id);
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  const [showInfo, setShowInfo] = useState<boolean>(false);
  const producto = useSelector((state: RootState) => state.producto.productoActivo);

  const handleVerInfo = (a: IProductos) => {
    dispatch(productoActivo(null));
    dispatch(productoActivo(a));
    setShowInfo(true);
  };

  const handleEditarHabilitado = async(productoHabilitado: IUpdateProducto) => {
    try{
      await serviceProducto.editOneProducto(productoHabilitado.id, productoHabilitado)
    }catch(error){
      console.error("Error al habilitar el producto: ", error)
    }
  }



  const handleHabilitado = (producto: IProductos) => {
    if (producto){
      console.log(producto.id)
      const productoHabilitado: IUpdateProducto = {
        id: producto.id,
        eliminado: producto.eliminado,
        denominacion: producto.denominacion,
        habilitado: true,
        precioVenta: producto.precioVenta,
        descripcion: producto.descripcion,
        codigo: producto.codigo,
        idCategoria: producto.categoria.id,
        idAlergenos: producto.alergenos.map((alergeno) => Number(alergeno.id)),
        imagenes: producto.imagenes
      }

      handleEditarHabilitado(productoHabilitado)

      setProductos((prevProductos) =>
        prevProductos.map((p) =>
          p.id === producto.id ? { ...p, habilitado: !p.habilitado } : p
        )
      );
    }
  }

  return (
    <>
      {/* Botón para abrir el modal */}
      <h2 className={styles.title}> Productos</h2>
      <button className={styles.buttonCrear} onClick={handleOpenModal}>
        <h5>Crear producto</h5>
      </button>
      <select
        name="categorias"
        value={selectedSubcategoriaId}
        className={styles.selectCategoria}
        onChange={(e) => {
          if (sucursal) {
            handleSubcategoriaChange(e);
          } else {
            console.error("Sucursal no está disponible al cambiar la categoría");
          }
        }}
        required
      >
        <option value="">Seleccione una Categoria</option>
        <option value="todas" onChange={() => setSelectedSubcategoriaId("todas")}>Seleccionar Todas Las Categorias</option>
        {subCategorias.map((subcategoria) => (
          <option key={subcategoria.id} value={subcategoria.id}>
            {subcategoria.denominacion}
          </option>
        ))}
      </select>

      <div style={{ width: '100%' }}>
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
            {
              productosFiltrados &&
              productosFiltrados.map((producto) => {
                if (producto.categoria.id === Number(selectedSubcategoriaId)) {
                  return (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td>{producto.denominacion}</td>
                      <td>{producto.precioVenta}</td>
                      <td>{producto.descripcion}</td>
                      <td>{producto.categoria.denominacion}</td>
                      <td className={styles.boton}>
                        <Button variant="outline-success" onClick={() => handleHabilitado(producto)} className={
                                                            producto.habilitado
                                                            ? styles.botonHabilitado
                                                            : styles.botonDeshabilitado
                                                            }>
                          <span className="material-symbols-outlined">thumb_up</span>
                        </Button>
                      </td>
                      <td style={{ width: 'auto' }}>
                        <div className={styles.buttonsContainer}>
                          <Button onClick={() => handleVerInfo(producto)} variant="outline-warning">
                            <span className="material-symbols-outlined">visibility</span>
                          </Button>
                          <Button onClick={() => handleEditModal(producto)} variant="outline-primary">
                            <span className="material-symbols-outlined">edit</span>
                          </Button>
                          <Button variant="outline-danger" onClick={() => handleDeleteProducto(producto.id)}>
                            <span className="material-symbols-outlined">delete_forever</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                } else {
                  if ('todas' === (selectedSubcategoriaId)) {
                    return (
                      <tr key={producto.id}>
                        <td>{producto.id}</td>
                        <td>{producto.denominacion}</td>
                        <td>{producto.precioVenta}</td>
                        <td>{producto.descripcion}</td>
                        <td>{producto.categoria.denominacion}</td>
                        <td className={styles.boton}>
                          <Button variant="outline-success">
                            <span className="material-symbols-outlined">thumb_up</span>
                          </Button>
                        </td>
                        <td style={{ width: 'auto' }}>
                          <div className={styles.buttonsContainer}>
                            <Button onClick={() => handleVerInfo(producto)} variant="outline-warning">
                              <span className="material-symbols-outlined">visibility</span>
                            </Button>
                            <Button onClick={() => handleEditModal(producto)} variant="outline-primary">
                              <span className="material-symbols-outlined">edit</span>
                            </Button>
                            <Button variant="outline-danger" onClick={() => handleDeleteProducto(producto.id)}>
                              <span className="material-symbols-outlined">delete_forever</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                }
              })
            }
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

      <ProductoInfo
        producto={producto}
        show={showInfo}
        onClose={() => setShowInfo(false)}
      />

    </>
  );
};
