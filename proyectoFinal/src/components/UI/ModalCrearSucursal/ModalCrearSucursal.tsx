import { FC } from "react";
import { useForm } from "../../../hooks/useForm/useForm";
import styleModalSucursal from "./ModalCrearSucursal.module.css"
import { Button } from "react-bootstrap";
import addImagen from "../ModalCrearEmpresa/imagen.png"

interface PopUpPropsSucursal{
    visible: boolean,
    onClose(): void,
    onAddSucursal: Function
}

export const ModalCrearSucursal : FC<PopUpPropsSucursal> =({visible, onClose, onAddSucursal}) => {
    const { values, handleChange, resetForm } = useForm({
        nombre: '',
        horarioApertura: '',
        horarioCierre: '',
        pais: '',
        provincia: '',
        localidad: '',
        latitud: '',
        longitud: '',
        nombreCalle: '',
        numeroCalle: 0,
        codigoPostal: 0,
        numeroPiso: 0,
        numeroDepartamento: 0,
        imagen: ''
      });

      const { nombre, horarioApertura, horarioCierre, pais, provincia, localidad, latitud, longitud, nombreCalle, numeroCalle, codigoPostal, numeroPiso, numeroDepartamento, imagen } = values;

    const addForm = () => {
        onAddSucursal(nombre, horarioApertura, horarioCierre, pais, provincia, localidad, latitud, longitud, nombreCalle, numeroCalle, codigoPostal, numeroPiso, numeroDepartamento, imagen); // Agregar empresa
        resetForm(); // Cerrar el modal
        onClose()
    }  

    const cancelForm = () => {
        resetForm()
        onClose()
    }

    if (!visible) {
        return null; // Si no está visible, no renderiza nada
      }
  return (
    <div className={styleModalSucursal.containerPopUp}>
      <div className={styleModalSucursal.popUpContainer}>
        <div className={styleModalSucursal.contenido}>
          <h2>Crear una sucursal</h2>

          {/* FORMULARIO PARA AGREGAR UNA SUCURSAL */}
          <form
            className={styleModalSucursal.formulario}
          >
            {/* NOMBRE DE LA SUCURSAL */}
            <input
              type="text"
              name='nombre'
              placeholder="Ingrese un nombre"
              value={nombre}
              onChange={handleChange}
              required
            />
            {/* HORARIO DE APERTURA */}
            <input
              type="date"
              name='horarioApertura'
              placeholder="Ingrese un horario de apertura" //ver el tipo date en la variable
              value={horarioApertura}
              onChange={handleChange}
              required
            />
            {/* HORARIO DE CIERRE */}
            <input
              type="date"
              name='horarioCierre'
              placeholder="Ingrese un horario de cierre"
              value={horarioCierre}
              onChange={handleChange}
              required
            />
              {/* SELECCIONAR UN PAIS */}
            <select name="pais" required> //usar un useState para guardar el valor
                    <option value="" disabled selected>Seleccione un país</option>
                    <option value="argentina">Argentina</option>
                    <option value="mexico">México</option>
                    <option value="chile">España</option>
            </select>
            {/* SELECCIONAR UNA PROVINCIA */}
            <select name="provincia"  required> //usar un useState para guardar el valor
                    <option value="" disabled selected>Seleccione un país</option>
                    <option value="mendoza">Mendoza</option>
                    <option value="santiago de chile">Santiago de Chile</option>
                    <option value="monterrey">Monterrey</option>
            </select>
            {/* SELECCIONAR UNA LOCALIDAD */}
            <select name="localidad" required> //usar un useState para guardar el valor
                    <option value="" disabled selected>Seleccione un país</option>
                    <option value="lujan de cuyo">Lujan de Cuyo, Mendoza</option>
                    <option value="godoy cruz">Godoy Cruz, Mendoza</option>
                    <option value="las condes">Las Condes, Santiago de Chile</option>
                    <option value="providencia">Providencia, Santiago de Chile</option>
                    <option value="san pedro garza garcia">San Pedro Garza García, Monterrey</option>
                    <option value="guadalupe">Guadalupe, Monterrey</option>
            </select>
                       {/* LATITUD*/}
            <input
              type="text"
              name='latitud'
              placeholder="Latitud"
              value={latitud}
              onChange={handleChange}
              required
            />
              {/* LONGITUD*/}
            <input
              type="text"
              name='longitud'
              placeholder="Longitud"
              value={latitud}
              onChange={handleChange}
              required
            />
               {/* NOMBRE DE LA CALLE*/}
            <input
              type="text"
              name='nombreCalle'
              placeholder="Nombre de la calle"
              value={nombreCalle}
              onChange={handleChange}
              required
            />
               {/* NUMERO DE LA CALLE*/}
            <input
              type="number"
              name='numeroCalle'
              placeholder="Numero de calle"
              value={numeroCalle}
              onChange={handleChange}
              required
            />
                {/* CODIGO POSTAL*/}
            <input
              type="number"
              name='codigoPostal'
              placeholder="Código Postal"
              value={codigoPostal}
              onChange={handleChange}
              required
            />
                {/* NUMERO DE PISO*/}
            <input
              type="number"
              name='numeroPiso'
              placeholder="Ingresa un número de piso"
              value={numeroPiso}
              onChange={handleChange}
            />
                {/* NUMERO DE DEPARTAMENTO*/}
            <input
              type="number"
              name='numeroDepartamento'
              placeholder="Ingresa un número de departamento"
              value={numeroDepartamento}
              onChange={handleChange}
              required
            />
            {/* AGREGAR IMAGEN */}
            <div className={styleModalSucursal.imagenContainer}>
              <input
                type="text"
                name='imagen'
                placeholder="Ingresa una imagen"
                value={imagen}
                onChange={handleChange}
              />
              <img src={addImagen} alt="imagen del boton" />
              {/* AGREGAR FUNCIONALIDAD PARA SUBIR UNA IMAGEN */}
            </div>
            <div className={styleModalSucursal.containerButtonsForm}>
              <Button
                variant="primary"
                type="submit"
                onClick={addForm}
                className={styleModalSucursal.formButton}
              >
                Enviar
              </Button>{" "}
              <Button
                variant="primary"
                onClick={cancelForm}
                className={styleModalSucursal.formButton}
              >
                Cerrar
              </Button>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
