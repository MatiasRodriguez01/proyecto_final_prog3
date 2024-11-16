
import { useEffect, useState } from "react";
import { ServiceAlergenos } from "../../../../services/ServiceAlergenos";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import ModalCrearAlergeno from "./ModalCrearAlergeno/ModalCrearAlergeno";

import styles from "./AlergenoListado.module.css"
import { Button } from "react-bootstrap";
import { ModalEditarAlergeno } from "./ModalCrearAlergeno/ModalEditarAlergeno";

// interface IPropsAlergeno {
//   AlergenoActivo: Function;
// }

export const AlergenoListado = () => {

  const serviceAlergeno = new ServiceAlergenos();

  const [alergenos, setAlergenos] = useState<IAlergenos[]>([])

  // Mostar modal
  const [mostrarModalAlergeno, setMostrarModalAlergeno] = useState<boolean>(false);

  const handleAbrirModalAlergeno = () => {
    setMostrarModalAlergeno(true)
  }

  // useEffect para guardar los alergenos
  useEffect(() => {
    const fetchAlergenos = async () => {
      try {
        const alergenosDelServicio = await serviceAlergeno.getAllAlergenos();
        console.log(alergenosDelServicio)
        setAlergenos(alergenosDelServicio)
      } catch (error) {
        console.log(error)
      }
    }

    fetchAlergenos()

  }, [alergenos]);

  return (
    <>
      <div className={styles.container}>
        <h2>Productos Alergenos</h2>
        <div className={styles.botonContainer}>
          <button
            className={styles.boton} type="button" onClick={handleAbrirModalAlergeno}
          ><strong>Agregar Alergenos</strong><span className="material-symbols-outlined">add</span>
          </button>
        </div>
        <hr />
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Denominacion</th>
              <th scope="col">Imagen</th>
              <th scope='col'>Ver</th>
              <th scope='col'>Editar</th>
              <th scope='col'>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {
              (alergenos.length !== 0) && (
                alergenos.map((alergeno) => (
                  <tr key={alergeno.id}>
                    <th scope="row">{alergeno.id}</th>
                    <td>{alergeno.denominacion}</td>
                    <td>
                      {alergeno.imagen?.url ? (
                        <img
                          style={{ width: '7vw', height: '12vh' }}
                          src={alergeno.imagen.url}
                          alt={alergeno.imagen.name}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>
                      <Button
                        className={styles.botones}
                        variant="outline-warning"
                      >
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        className={styles.botones}
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        className={styles.botones}
                      >
                        <span className="material-symbols-outlined">
                          delete_forever
                        </span>
                      </Button>
                    </td>
                  </tr>


                ))
              )
            }
          </tbody>
        </table>
      </div>
      <ModalCrearAlergeno
        show={mostrarModalAlergeno}
        onClose={() => setMostrarModalAlergeno(false)}
      />

    </>
  );
};
