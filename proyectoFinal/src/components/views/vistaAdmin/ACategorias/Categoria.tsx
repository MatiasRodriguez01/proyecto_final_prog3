import { useEffect, useState } from "react";
import ModalCrearCategoria from "../ACategorias/ModalCrearCategoria/ModalCrearCategoria";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { ServiceCategorias } from "../../../../services/ServiceCategorias";
import { guardarCategorias } from "../../../../slices/categoriaSlice";
import categoriaStyle from "./Categoria.module.css";
import { Accordion } from "react-bootstrap";

export const Categoria = () => {
  // servicio
  const servicioCategoria = new ServiceCategorias();

  // dispatch
  const dispatch = useDispatch();

  // empresa activa y sucursal activa
  const sucursal = useSelector(
    (state: RootState) => state.sucursal.sucursalActiva
  );
  const empresa = useSelector(
    (state: RootState) => state.empresa.empresaActiva
  );

  // mostrar el modal de categoria
  const [mostrarModalCategoria, setMostrarModalCategoria] =
    useState<boolean>(false);

  // funcion para abrir del modal
  const handleAbrirModalCrearCategorias = () => {
    setMostrarModalCategoria(true);
  };

  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  useEffect(() => {
    const fetchCategorias = async () => {
      if (sucursal !== null) {
        try {
          const categoriasDelServicio =
            await servicioCategoria.getAllCategorias();
          setCategorias(categoriasDelServicio);
          dispatch(guardarCategorias(categoriasDelServicio));
        } catch (error) {
          console.log("Error al traer las categorias: ", error);
        }
      }
    };
    fetchCategorias();
  }, [categorias]);

  return (
    <>
      {/* Título */}
      <div className={categoriaStyle.tituloContainer}>
        <h2>Categorías</h2>
      </div>

      {/*Abrir el modal */}
      <div className={categoriaStyle.buttonContainer}>
        <button
          style={{ width: "auto", height: "auto" }}
          onClick={handleAbrirModalCrearCategorias}
        >
          Crear Categoría
        </button>
      </div>

      {/* Categorías */}
      <div className={categoriaStyle.categoriasContainer}>
        <Accordion defaultActiveKey="0">
          {categorias.map((c) => (
            <Accordion.Item eventKey={String(c.id)} key={c.id}>
              <Accordion.Header>{c.denominacion}</Accordion.Header>
              <Accordion.Body>
                <div
                  style={{
                    width: "15vw",
                    border: "1px solid grey",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  className={categoriaStyle.categoriasCard}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "5px", // Espaciado uniforme
                    }}
                  >
                    {c.subCategorias
                      .slice()
                      .sort((a, b) =>
                        a.denominacion.localeCompare(b.denominacion)
                      )
                      .map((sub) => (
                        <p key={sub.id} style={{ fontSize: "12px", margin: 0 }}>
                          {sub.denominacion}
                        </p>
                      ))}
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

      {/* Modal para crear categoría */}
      <ModalCrearCategoria
        empresa={empresa}
        show={mostrarModalCategoria}
        onClose={() => setMostrarModalCategoria(false)}
      />
    </>
  );
};
