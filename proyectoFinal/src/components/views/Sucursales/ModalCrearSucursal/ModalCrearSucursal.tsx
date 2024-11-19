import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import addImagen from "../../Empresas/ModalCrearEmpresa/imagen.png";
import styleModalSucursal from "./ModalCrearSucursal.module.css";
import { useForm } from "../../../../hooks/useForm";
import { ICreateSucursal } from "../../../../types/dtos/sucursal/ICreateSucursal";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { ServiceSucursal } from "../../../../services/ServiceSucursal";
import { ServiceLocalizacion } from "../../../../services/ServiceLocalizacion";
import { IPais } from "../../../../types/IPais";
import { IProvincia } from "../../../../types/IProvincia";
import { ILocalidad } from "../../../../types/ILocalidad";


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
  const serviceLocalizacion = new ServiceLocalizacion()

  const [esCasaMatriz, setEsCasaMatriz] = useState(false)

  const [idLocalidad, setIdLocalidad] = useState(1)

  const [paises, setPaises] = useState<IPais[]>([])
  const [provincias, setProvincias] = useState<IProvincia[]>([])
  const [localidades, setLocalidades] = useState<ILocalidad[]>([])

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

  useEffect(() => {
    const fetchPaises = async () => {
      try{
        const responsePaises = await serviceLocalizacion.getPaises()
        setPaises(responsePaises)
      }catch(error){
        console.log("Error al obtener paises, ", error)
      }
    }

    if (visible){
      fetchPaises()
    }
  }, [paises, visible])

  const handlePaisChange = async(event: ChangeEvent<HTMLSelectElement>) => {
    const selectedPaisId = Number(event.target.value)
    handleChange(event)

    try{
      const responseProvincias = await serviceLocalizacion.getProvincias(selectedPaisId)
      setProvincias(responseProvincias)
      console.log("provincias: ", provincias)
      setLocalidades([])
    }catch(error){
      console.log("Error al obtener las provincias, ", error)
    }
  }

  const handleProvinciaChange = async(event: ChangeEvent<HTMLSelectElement>) => {
    const selectedProvinciaId = Number(event.target.value)
    handleChange(event)

    try{
      const responseLocalidades = await serviceLocalizacion.getLocalidades(selectedProvinciaId)
      setLocalidades(responseLocalidades)
      console.log("Localidades: ", localidades)
    }catch(error){
      console.log("Error al obtener las provincias, ", error)
    }
  }

  const handleCreateSucursal = async (newSucursal: ICreateSucursal) => {
    try{
      await serviceSucursal.createOneSucursal(newSucursal)
    }catch(error){
      console.log("Error creando sucursal, ", error)
    }
  }

  const addForm = () => {
    setEsCasaMatriz(true)
    setIdLocalidad(5)
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
              <div className="checkboxContainer">
              <input type="checkbox"  name="esCasaMatriz" checked={esCasaMatriz} onChange={(e) => setEsCasaMatriz(e.target.checked)} style={{width: "16px", height:"16px", marginRight: "8px"}}/>
              <label htmlFor="esCasaMatriz">Habilitado</label>
              </div>
            </div>
            {/* CONTENEDOR DE LA SEGUNDA COLUMNA DEL MODAL */}
            <div className={styleModalSucursal.columnaDos}>
              {/* SELECCIONAR UN PAIS */}
              <select name="pais" onChange={handlePaisChange} required>
                {" "}
                <option value={values.pais} disabled>
                  Seleccione un País
                </option>
                {paises.map((pais) => (
                <option key={pais.id} value={pais.id}>{pais.nombre}</option>))}
              </select>
              {/* SELECCIONAR UNA PROVINCIA */}
              <select name="provincia" onChange={(event) =>handleProvinciaChange(event)} required>
                {" "}
                <option value={values.provincia} disabled>
                  Seleccione una Provincia
                </option>
                {provincias.map((provincia) => (
                <option key={provincia.id} value={provincia.id}>{provincia.nombre}</option>))}
              </select>
              {/* SELECCIONAR UNA LOCALIDAD */}
              <select name="localidad" onChange={(e) => setIdLocalidad(Number(e.target.value))} required>
                {" "}
                <option value={values.localidad} disabled>
                  Seleccione una Localidad
                </option>
                {localidades.map((localidad) => (
                <option key={localidad.id} value={localidad.id}>{localidad.nombre}</option>))}
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
