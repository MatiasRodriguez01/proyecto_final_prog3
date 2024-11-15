import { Button } from "react-bootstrap"
import ModalCrearAlergeno from "./ModalCrearAlergeno/ModalCrearAlergeno";
import { useState } from "react";

export const Alergenos = () => {

    //Alergenos
  const [mostrarModalAlergeno, setMostrarModalAlergeno] = useState<boolean>(false);
  
  const handleAbrirModalAlergeno = () => {
    setMostrarModalAlergeno(true)
  }

    return (
        <>
            <Button 
                onClick={handleAbrirModalAlergeno}
                style={{ width: '15vw', height: '100%' }}>
                Agregar Alergeno
            </Button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>


            <ModalCrearAlergeno
                show={mostrarModalAlergeno}
                onClose={() => setMostrarModalAlergeno(false)}
            />
        </>
    )
}

