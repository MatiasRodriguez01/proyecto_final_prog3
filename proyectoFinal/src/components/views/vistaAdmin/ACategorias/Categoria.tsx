import { useEffect, useState } from "react";
import { RootState } from "../../../../hooks/store/store";
import { useDispatch, useSelector } from "react-redux";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { ServiceCategorias } from "../../../../services/ServiceCategorias";
import { categoriaActiva, guardarCategorias, subCategoriaActiva } from "../../../../slices/categoriaSlice";
import categoriaStyle from "./Categoria.module.css";
import { Accordion, Button, ListGroup } from "react-bootstrap";
import ModalCrearCategoria from "./Categoria/ModalCrearCategoria/ModalCrearCategoria";
import { ModalEditarCategoria } from "./Categoria/ModalEditarCategoria/ModalEditarCategoria";
import { ModalEditarSubCategoria } from "./SubCategoria/ModalEditarSubCategoria/ModalEditarSubCategoria";
import ModalCrearSubcategoria from "./SubCategoria/ModalCrearSubcategoria/ModalCrearSubcategoria";

export const Categoria = () => {
  // servicio
  const servicioCategoria = new ServiceCategorias();

  // dispatch
  const dispatch = useDispatch();

  // empresa activa, sucursal activa 
  const sucursal = useSelector(
    (state: RootState) => state.sucursal.sucursalActiva
  );
  const empresa = useSelector(
    (state: RootState) => state.empresa.empresaActiva
  );

  // categoria activa
  const categoria = useSelector((state: RootState) => state.categoria.categoriaActiva);
  useEffect(() => {
    console.log("Creando la categoria activa", categoria)
  }, [categoria])

  // subCategoria activa
  const subCate = useSelector((state: RootState) => state.categoria.subCategoriaActiva);
  useEffect(() => {
    console.log("Creando la subCategoria activa", subCate)
  }, [subCate])

  // mostrar el modal de categoria
  const [mostrarModalCategoria, setMostrarModalCategoria] = useState<boolean>(false);

  // funcion para abrir del modal
  const handleAbrirModalCrearCategorias = () => {
    setMostrarModalCategoria(true);
  };

  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  useEffect(() => {
    const fetchCategorias = async () => {
      if ((sucursal !== null) && (empresa !== null)) {
        try {
          const categoriasDelServicio = await servicioCategoria.getCategoriasPorEmpresa(empresa?.id);
          setCategorias(categoriasDelServicio);
          dispatch(guardarCategorias(categoriasDelServicio));
        } catch (error) {
          console.log("Error al traer las categorias: ", error);
        }
      }
    };
    fetchCategorias();
  }, [categorias, dispatch]);

  // modal edita categoria
  const [popUpEditar, setPopUpEditar] = useState<boolean>(false);
  const handlePopUpEditar = (cate: ICategorias) => {
    dispatch(categoriaActiva(cate))
    setPopUpEditar(!popUpEditar);
  }

  //subCategoriaActiva
  const [popUpEditarSubCategoria, setPopUpEditarSubCategoria] = useState<boolean>(false);
  const handlePopUpEditarSubCategoria = (cate: ICategorias) => {
    dispatch(subCategoriaActiva(cate))
    setPopUpEditarSubCategoria(!popUpEditarSubCategoria);
  }

  //subCategoriaActiva
  const [popUpCrearSubCategoria, setPopUpCrearSubCategoria] = useState<boolean>(false);
  const handlePopUpCrearSubCategoria = (cate: ICategorias) => {
    dispatch(subCategoriaActiva(cate))
    setPopUpCrearSubCategoria(!popUpCrearSubCategoria);
  }

  // click categoria 
  const handleClickCategoria = (cate: ICategorias) => {
    dispatch(categoriaActiva(null))
    dispatch(categoriaActiva(cate))
  }

  return (
    <>
      {/* Título */}
      <div className={categoriaStyle.tituloContainer}>
        <h2>Categorías</h2>
      </div>

      {/*Abrir el modal */}
      <div className={categoriaStyle.buttonContainer}>
        <button
          onClick={handleAbrirModalCrearCategorias}
          className={categoriaStyle.botonCrearCategorias}
        >
          Crear Categoría
        </button>
      </div>

      {/* Categorías */}
      <div className={categoriaStyle.categoriasContainer}>
        <Accordion defaultActiveKey="0">
          {
            categorias.map((c) => {
              if (c.categoriaPadre === null) {
                return (
                  <Accordion.Item
                    onClick={() => handleClickCategoria(c)}
                    eventKey={String(c.id)}
                    key={c.id}
                  >
                    <Accordion.Header>
                      <strong>{c.denominacion}</strong>
                      <div style={{ width: '90vw' }}>
                        <Button
                          style={{ width: '4vw', height: '6vh', float: 'right' }}
                          onClick={(event) => {
                            event.stopPropagation();
                            handlePopUpCrearSubCategoria(c);
                          }}
                          variant="outline-success"><span className="material-symbols-outlined">add</span>
                        </Button>
                        <Button
                          style={{ width: '4vw', height: '6vh', float: 'right' }}
                          onClick={(event) => {
                            event.stopPropagation();
                            handlePopUpEditar(c);
                          }}
                          variant="outline-primary"><span className="material-symbols-outlined">edit</span>
                        </Button>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ListGroup>
                        { //.slice()
                          //.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
                          c.subCategorias && c.subCategorias
                            .slice()
                            .sort((a, b) => a.denominacion.localeCompare(b.denominacion))
                            .map((sub) => (
                              <ListGroup.Item key={sub.id}>
                                {sub.denominacion}
                                <Button
                                  onClick={() => handlePopUpEditarSubCategoria(sub)}
                                  style={{ width: '4vw', height: '6vh', margin: '0', float: 'right' }}
                                  variant="outline-primary"><span style={{ textAlign: 'center' }} className="material-symbols-outlined">edit</span>
                                </Button>
                              </ListGroup.Item>
                            ))
                        }
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                )
              }

            })
          }
        </Accordion>
      </div>

      {/* Modal para crear categoría */}
      <ModalCrearCategoria
        empresa={empresa}
        show={mostrarModalCategoria}
        onClose={() => setMostrarModalCategoria(false)}
      />

      {/* Modal para editar categoria */}
      {
        popUpEditar &&
        <ModalEditarCategoria
          categoria={categoria}
          show={popUpEditar}
          onClose={() => setPopUpEditar(false)}
        />
      }

      {
        popUpCrearSubCategoria &&
        <ModalCrearSubcategoria
          empresa={empresa}
          show={popUpCrearSubCategoria}
          onClose={() => setPopUpCrearSubCategoria(false)}
        />
      }

      {
        popUpEditarSubCategoria &&
        <ModalEditarSubCategoria
          subCategoria={subCate}
          show={popUpEditarSubCategoria}
          onClose={() => setPopUpEditarSubCategoria(false)}
        />
      }
    </>
  );
};
