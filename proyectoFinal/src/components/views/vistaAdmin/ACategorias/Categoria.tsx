import { useEffect, useState } from "react";
import ModalCrearCategoria from "../ACategorias/ModalCrearCategoria/ModalCrearCategoria"
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { ServiceCategorias } from "../../../../services/ServiceCategorias";
import { guardarCategorias } from "../../../../slices/categoriaSlice";
import { Accordion } from "react-bootstrap";

export const Categoria = () => {

  // servicio
  const servicioCategoria = new ServiceCategorias();

  // dispatch
  const dispatch = useDispatch();

  // empresa activa y sucursal activa
  const sucursal = useSelector((state: RootState) => state.sucursal.sucursalActiva);
  const empresaActiva = useSelector((state: RootState) => state.empresa.empresaActiva);

  // mostrar el modal de categoria
  const [mostrarModalCategoria, setMostrarModalCategoria] = useState<boolean>(false);

  // funcion para abrir del modal
  const handleAbrirModalCrearCategorias = () => {
    // setEditarCategoria(null);
    setMostrarModalCategoria(true);
  };

  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  useEffect(() => {
    const fetchCategorias = async () => {
      if (sucursal !== null) {
        try {
          const categoriasDelServicio = await servicioCategoria.getAllCategorias();
          setCategorias(categoriasDelServicio)
          dispatch(guardarCategorias(categoriasDelServicio))

        } catch (error) {
          console.log('Error al traer las categorias: ', error)
        }
      }
    }
    fetchCategorias();
  }, [categorias]);

  return (
    <>
      {/* Botón para abrir el modal */}
      <h2>Categorias</h2>
      <button
        style={{ width: 'auto', height: 'auto' }}
        onClick={handleAbrirModalCrearCategorias}
      >Crear Categoría</button>
      {/* <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)'
      }}>
        {categorias.map((c) => (
          <div
            key={c.id}
            style={{
              width: "15vw",
              border: "1px solid grey",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: "14px", marginBottom: "10px" }}>{c.denominacion}</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "5px", // Espaciado uniforme
              }}
            >
              {c.subCategorias
                .slice() // Crear una copia para no mutar el estado original
                .sort((a, b) => a.denominacion.localeCompare(b.denominacion)) // Ordenar por nombre
                .map((sub) => (
                  <p key={sub.id} style={{ fontSize: "12px", margin: 0 }}>
                    {sub.denominacion}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div> */}
      <Accordion defaultActiveKey="0">
        {
          categorias.map((cate) => (
            <Accordion.Item eventKey={String(cate.id)}>
              <Accordion.Header>{cate.denominacion}</Accordion.Header>
              <Accordion.Body>
                HOLA
              </Accordion.Body>
            </Accordion.Item>
          ))
        }
      </Accordion>


      {/* Modal de Crear Categoría */}
      <ModalCrearCategoria
        empresa={empresaActiva}
        show={mostrarModalCategoria}
        onClose={() => setMostrarModalCategoria(false)}
      />
    </>
  );
};
