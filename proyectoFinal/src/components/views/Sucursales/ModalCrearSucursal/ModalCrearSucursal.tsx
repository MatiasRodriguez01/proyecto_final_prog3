import { ChangeEvent, FC, useState } from "react";
import { Button } from "react-bootstrap";

import addImagen from "../../Empresas/ModalCrearEmpresa/imagen.png";
import styleModalSucursal from "./ModalCrearSucursal.module.css";
import { useForm } from "../../../../hooks/useForm";
import { ICreateSucursal } from "../../../../types/dtos/sucursal/ICreateSucursal";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { ServiceSucursal } from "../../../../services/ServiceSucursal";


interface PopUpPropsSucursal {
  empresa: IEmpresa,
  visible: boolean;
  onClose(): void;
}

export const ModalCrearSucursal: FC<PopUpPropsSucursal> = ({empresa,
  visible,
  onClose
}) => {

  const serviceSucursal = new ServiceSucursal()

  const [esCasaMatriz, setEsCasaMatriz] = useState(false)

  const [idLocalidad, setIdLocalidad] = useState(1)

  const { values, handleChange, resetForm } = useForm({
    nombre: "",
    horarioApertura: "",
    horarioCierre: "",
    pais: "",
    provincia: "",
    localidad: "",
    latitud: 0,
    longitud: 0,
    nombreCalle: "",
    numeroCalle: 0,
    codigoPostal: 0,
    numeroPiso: 0,
    numeroDepartamento: 0,
    imagen: "",
  });

  const {
    nombre,
    horarioApertura,
    horarioCierre,
    pais,
    provincia,
    localidad,
    latitud,
    longitud,
    nombreCalle,
    numeroCalle,
    codigoPostal,
    numeroPiso,
    numeroDepartamento,
    imagen,
  } = values;

  const handleCreateSucursal = async (newSucursal: ICreateSucursal) => {
    try{
      await serviceSucursal.createOneSucursal(newSucursal)
    }catch(error){
      console.log("Error creando sucursal, ", error)
    }
  }

  const addForm = () => {
    const newSucursal: ICreateSucursal = {
      nombre: nombre,
      horarioApertura: horarioApertura,
      horarioCierre: horarioCierre,
      esCasaMatriz: esCasaMatriz,
      latitud: latitud,
      longitud: longitud,
      domicilio: {
        calle: nombreCalle,
        numero: numeroCalle,
        cp: codigoPostal,
        piso: numeroPiso,
        nroDpto: numeroDepartamento,
        idLocalidad: idLocalidad
      },
      idEmpresa: empresa.id,
      logo: imagen
    }
    handleCreateSucursal(newSucursal)
    console.log(newSucursal)
    resetForm(); 
    onClose();
  };

  const cancelForm = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  if (!visible) {
    return null; 
  }
  return (
    <div className={styleModalSucursal.containerPopUp}>
      <div className={styleModalSucursal.popUpContainer}>
        <div className={styleModalSucursal.contenido}>
          <h2>Crear una sucursal</h2>

          {/* FORMULARIO PARA AGREGAR UNA SUCURSAL */}
          <form
            className={styleModalSucursal.formulario}
            onSubmit={handleSubmit}
          >
            {/* CONTENEDOR DE LA PRIMER COLUMNA DEL MODAL */}
            <div className={styleModalSucursal.columnaUno}>
              {/* NOMBRE DE LA SUCURSAL */}
              <input
                type="text"
                name="nombre"
                placeholder="Ingrese un nombre"
                value={nombre}
                onChange={handleChange}
                required
              />
              {/* HORARIO DE APERTURA */}
              <input
                type="time"
                name="horarioApertura"
                value={horarioApertura}
                onChange={handleChange}
                required
              />
              {/* HORARIO DE CIERRE */}
              <input
                type="time"
                name="horarioCierre"
                placeholder="Ingrese un horario de cierre"
                value={horarioCierre}
                onChange={handleChange}
                required
              />
            </div>
            {/* CONTENEDOR DE LA SEGUNDA COLUMNA DEL MODAL */}
            <div className={styleModalSucursal.columnaDos}>
              {/* SELECCIONAR UN PAIS */}
              <select name="pais" onChange={handleChange} required>
                {" "}
                <option value={pais} disabled>
                  País
                </option>
                <option value="argentina">Argentina</option>
                <option value="chile">Chile</option>
                <option value="mexico">Mexico</option>
              </select>
              {/* SELECCIONAR UNA PROVINCIA */}
              <select name="provincia" onChange={handleChange} required>
                {" "}
                <option value={provincia} disabled>
                  Provincia
                </option>
                <option value="mendoza">Mendoza</option>
                <option value="santiago de chile">Santiago de Chile</option>
                <option value="monterrey">Monterrey</option>
              </select>
              {/* SELECCIONAR UNA LOCALIDAD */}
              <select name="localidad" onChange={handleChange} required>
                {" "}
                <option value={localidad} disabled>
                  Localidad
                </option>
                <option value="lujan de cuyo">Lujan de Cuyo, Mendoza</option>
                <option value="godoy cruz">Godoy Cruz, Mendoza</option>
                <option value="las condes">
                  Las Condes, Santiago de Chile
                </option>
                <option value="providencia">
                  Providencia, Santiago de Chile
                </option>
                <option value="san pedro garza garcia">
                  San Pedro Garza García, Monterrey
                </option>
                <option value="guadalupe">Guadalupe, Monterrey</option>
              </select>
              {/* LATITUD*/}
              <input
                type="number"
                name="latitud"
                placeholder="Latitud"
                value={latitud}
                onChange={handleChange}
                required
              />
              {/* LONGITUD*/}
              <input
                type="number"
                name="longitud"
                placeholder="Longitud"
                value={longitud}
                onChange={handleChange}
                required
              />
              {/* NOMBRE DE LA CALLE*/}
              <input
                type="text"
                name="nombreCalle"
                placeholder="Nombre de la calle"
                value={nombreCalle}
                onChange={handleChange}
                required
              />

              {/* NUMERO DE LA CALLE*/}
              <input
                type="number"
                name="numeroCalle"
                placeholder="Numero de calle"
                value={numeroCalle}
                onChange={handleChange}
                required
              />

              {/* CODIGO POSTAL*/}
              <input
                type="number"
                name="codigoPostal"
                placeholder="Código Postal"
                value={codigoPostal}
                onChange={handleChange}
                required
              />

              {/* NUMERO DE PISO*/}
              <input
                type="number"
                name="numeroPiso"
                placeholder="Ingresa un número de piso"
                value={numeroPiso}
                onChange={handleChange}
              />

              {/* NUMERO DE DEPARTAMENTO*/}
              <input
                type="number"
                name="numeroDepartamento"
                placeholder="Ingresa un número de departamento"
                value={numeroDepartamento}
                onChange={handleChange}
                required
              />
            </div>
          </form>
          {/* AGREGAR IMAGEN */}
          <div className={styleModalSucursal.imagenContainer}>
            <input
              type="text"
              name="imagen"
              placeholder="Ingresa una imagen"
              value={imagen}
              onChange={handleChange}
            />
            <img src={addImagen} alt="imagen del boton" />
          </div>
          {/* AGREGAR FUNCIONALIDAD PARA SUBIR UNA IMAGEN */}
          <div className={styleModalSucursal.containerButtonsForm}>
            <Button
              variant="primary"
              onClick={cancelForm}
              className={styleModalSucursal.formButtonCancel}
            >
              Cancelar
            </Button>{" "}
            <Button
              variant="primary"
              type="submit"
              onClick={addForm}
              className={styleModalSucursal.formButtonAccept}
            >
              Enviar
            </Button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};