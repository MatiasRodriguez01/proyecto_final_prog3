
import { useEffect, useState } from "react";
import { ServiceAlergenos } from "../../../../services/ServiceAlergenos";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import ModalCrearAlergeno from "./ModalCrearAlergeno/ModalCrearAlergeno";

import styles from "./AlergenoListado.module.css"
import { Button } from "react-bootstrap";
import { AlergenoInfo } from "./AlergenoInfo/AlergenoInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { alergenoActivo, editarAlergeno, guardarAlergenos } from "../../../../slices/alegenoSlice";
import { ModalEditarAlergeno } from "./ModalCrearAlergeno/ModalEditarAlergeno";

// interface IPropsAlergeno {
//   AlergenoActivo: Function;
// }

export const AlergenoListado = () => {

  // usamos el dispatch para usar los slice
  const dispatch = useDispatch();

  // el servicio de alergeno
  const serviceAlergeno = new ServiceAlergenos();

  // usamos el useState para guardar los alergenos
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([])

  // Mostar el modal crear
  const [mostrarModalAlergeno, setMostrarModalAlergeno] = useState<boolean>(false);

  // Mostrar el modal editar
  const [mostrarModalEditar, setMostrarModalEditar] = useState<boolean>(false);
  const alergenoEditado = useSelector((state: RootState) => state.alergeno.alergenoEditado)

  useEffect(() => {
    console.log('Alergeno editado, actualizado: ', alergenoEditado)
  }, [alergenoEditado])

  const handleModalEditar = (a: IAlergenos) => {
    dispatch(editarAlergeno(null))
    dispatch(editarAlergeno(a))
    setMostrarModalEditar(true);
  }

  // modal de informacion
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const alergeno = useSelector((state: RootState) => state.alergeno.alergenoActivo)

  const handleAlegenoActiva = (a: IAlergenos) => {
    dispatch(alergenoActivo(a))
    setShowInfo(true);
  }

  // crearmos el eliminar objeto
  // const alergenoAEliminar = useSelector((state: RootState) => state.alergeno.alergenoEliminado);

  // useEffect(() => {
  //   console.log('alergeno eliminado:', alergenoAEliminar)
  // }, [alergenoAEliminar]);

  const handleEliminarAlergeno = async (id: number) => {
    try {
      await serviceAlergeno.deleteAlergenoById(id); // Llama al servicio para eliminar
      alert("Alérgeno eliminado exitosamente.");
    } catch (error) {
      console.error("Error eliminando alérgeno:", error);
      alert("Hubo un error al eliminar el alérgeno.");
    }
  };

  // useEffect para guardar los alergenos
  useEffect(() => {

    const fetchAlergenos = async () => {
        const alergenosDelServicio = await serviceAlergeno.getAllAlergenos();
        setAlergenos(alergenosDelServicio);
        dispatch(guardarAlergenos(alergenosDelServicio));   
    }
    fetchAlergenos()
  }, [alergenos, dispatch]);

  return (
    <>
      <div className={styles.container}>
        <h2>Productos Alergenos</h2>
        <div className={styles.botonContainer}>
          <button className={styles.boton} type="button" onClick={() => setMostrarModalAlergeno(true)}>
            <strong>Agregar Alergenos</strong>
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        <hr />
        {alergenos.length === 0 ? (
          <p>No hay alérgenos disponibles.</p>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Denominacion</th>
                <th scope="col">Imagen</th>
                <th scope="col">Ver</th>
                <th scope="col">Editar</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {alergenos.map((alergeno) => (
                <tr key={alergeno.id}>
                  <th scope="row">{alergeno.id}</th>
                  <td>{alergeno.denominacion}</td>
                  <td>
                    {alergeno.imagen?.url ? (
                      <img style={{ width: "7vw", height: "12vh" }} src={alergeno.imagen.url} alt={alergeno.imagen.name} />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>
                    <Button
                      className={styles.botones}
                      variant="outline-warning"
                      onClick={() => handleAlegenoActiva(alergeno)}
                      aria-label="Ver alergeno"
                    >
                      <span className="material-symbols-outlined">visibility</span>
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      className={styles.botones}
                      onClick={() => handleModalEditar(alergeno)}
                      aria-label="Editar alergeno"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      className={styles.botones}
                      onClick={() => handleEliminarAlergeno(alergeno.id)}
                      aria-label="Eliminar alergeno"
                    >
                      <span className="material-symbols-outlined">delete_forever</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showInfo && (
        <AlergenoInfo alergeno={alergeno} onVerAlergeno={() => setShowInfo(false)} />
      )}


      <ModalCrearAlergeno show={mostrarModalAlergeno} onClose={() => setMostrarModalAlergeno(false)} />


      <ModalEditarAlergeno alergeno={alergenoEditado} visible={mostrarModalEditar} onClose={() => setMostrarModalEditar(false)} />


    </>
  );
};
