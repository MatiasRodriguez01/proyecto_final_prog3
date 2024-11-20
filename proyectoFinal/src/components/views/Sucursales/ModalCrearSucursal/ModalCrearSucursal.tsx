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
  empresa: IEmpresa;
  visible: boolean;
  onClose(): void;
}

export const ModalCrearSucursal: FC<PopUpPropsSucursal> = ({
  empresa,
  visible,
  onClose,
}) => {
  const serviceSucursal = new ServiceSucursal();
  const serviceLocalizacion = new ServiceLocalizacion();

  const [esCasaMatriz, setEsCasaMatriz] = useState(false);

  const [idLocalidad, setIdLocalidad] = useState<number>(0);

  const [paises, setPaises] = useState<IPais[]>([]);
  const [provincias, setProvincias] = useState<IProvincia[]>([]);
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);

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
      try {
        const responsePaises = await serviceLocalizacion.getPaises();
        setPaises(responsePaises);

        if (responsePaises.length === 1) {
          const selectedPaisId = responsePaises[0].id;
          handlePaisChange({
            target: { value: String(selectedPaisId), name: "pais" },
          } as ChangeEvent<HTMLSelectElement>);
        }
      } catch (error) {
        console.log("Error al obtener paises, ", error);
      }
    };

    if (visible) {
      fetchPaises();
    }
  }, [visible]);

  const handlePaisChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedPaisId = Number(event.target.value);
    handleChange(event);

    try {
      const responseProvincias = await serviceLocalizacion.getProvincias(
        selectedPaisId
      );
      setProvincias(responseProvincias);
      console.log("provincias: ", provincias);
      setLocalidades([]);
      setIdLocalidad(0);
    } catch (error) {
      console.log("Error al obtener las provincias, ", error);
    }
  };

  const handleProvinciaChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedProvinciaId = Number(event.target.value);
    handleChange(event);

    try {
      const responseLocalidades = await serviceLocalizacion.getLocalidades(
        selectedProvinciaId
      );
      setLocalidades(responseLocalidades);
      setIdLocalidad(0);
      console.log("Localidades: ", localidades);
    } catch (error) {
      console.log("Error al obtener las provincias, ", error);
    }
  };

  const handleCreateSucursal = async (newSucursal: ICreateSucursal) => {
    try {
      await serviceSucursal.createOneSucursal(newSucursal);
    } catch (error) {
      console.log("Error creando sucursal, ", error);
    }
  };

  const addForm = () => {
    setEsCasaMatriz(true);
    setIdLocalidad(5);
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
        idLocalidad: idLocalidad,
      },
      idEmpresa: empresa.id,
      logo: imagen,
    };
    handleCreateSucursal(newSucursal);
    console.log(newSucursal);
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
              <div className={styleModalSucursal.inputField}>
                <label
                  htmlFor="nombre"
                  className={styleModalSucursal.floatingLabel}
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  placeholder=" "
                  value={nombre}
                  onChange={handleChange}
                  required
                  className={styleModalSucursal.inputElement}
                />
              </div>
              {/* HORARIO DE APERTURA */}
              <div className={styleModalSucursal.inputField}>
                <label
                  htmlFor="horarioApertura"
                  className={styleModalSucursal.floatingLabel}
                >
                  Horario de Apertura
                </label>
                <input
                  type="time"
                  name="horarioApertura"
                  value={horarioApertura}
                  onChange={handleChange}
                  required
                  className={styleModalSucursal.inputElement}
                />
              </div>
              {/* HORARIO DE CIERRE */}
              <div className={styleModalSucursal.inputField}>
                <label
                  htmlFor="horarioCierre"
                  className={styleModalSucursal.floatingLabel}
                >
                  Horario Cierre
                </label>
                <input
                  type="time"
                  name="horarioCierre"
                  placeholder=" "
                  value={horarioCierre}
                  onChange={handleChange}
                  required
                  className={styleModalSucursal.inputElement}
                />
              </div>
              <div className="checkboxContainer">
                <input
                  type="checkbox"
                  name="esCasaMatriz"
                  checked={esCasaMatriz}
                  onChange={(e) => setEsCasaMatriz(e.target.checked)}
                  style={{ width: "16px", height: "16px", marginRight: "8px" }}
                />
                <label htmlFor="esCasaMatriz">Habilitado</label>
              </div>
            </div>
            {/* CONTENEDOR DE LA SEGUNDA COLUMNA DEL MODAL */}
            <div className={styleModalSucursal.columnaDos}>
              {/* SELECCIONAR UN PAIS */}
              <div className={styleModalSucursal.inputField}>
                <label
                  htmlFor="pais"
                  className={styleModalSucursal.floatingLabel}
                >
                  Pais
                </label>
                <select
                  name="pais"
                  value={pais}
                  onChange={handlePaisChange}
                  required
                  className={styleModalSucursal.inputElement}
                >
                  <option value="">Seleccione un País</option>
                  {paises.map((pais) => (
                    <option key={pais.id} value={pais.id}>
                      {pais.nombre}
                    </option>
                  ))}
                </select>
              </div>
              {/* SELECCIONAR UNA PROVINCIA */}
              <div className={styleModalSucursal.inputField}>
                <label
                  htmlFor="provincia"
                  className={styleModalSucursal.floatingLabel}
                >
                  Provincia
                </label>
                <select
                  name="provincia"
                  value={provincia}
                  onChange={handleProvinciaChange}
                  required
                  className={styleModalSucursal.inputElement}
                >
                  <option value="">Seleccione una Provincia</option>
                  {provincias.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.nombre}
                    </option>
                  ))}
                </select>
              </div>
              {/* SELECCIONAR UNA LOCALIDAD */}

              <div className={styleModalSucursal.inputField}>
                <label
                  htmlFor="localidad"
                  className={styleModalSucursal.floatingLabel}
                >
                  Localidad
                </label>
                <select
                  name="localidad"
                  value={idLocalidad || ""}
                  onChange={(e) => setIdLocalidad(Number(e.target.value))}
                  required
                  className={styleModalSucursal.inputElement}
                >
                  <option value="">Seleccione una Localidad</option>
                  {localidades.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.nombre}
                    </option>
                  ))}
                </select>
              </div>
              {/* LATITUD */}
              <div className={styleModalSucursal.inputField}>
                <label
                  htmlFor="latitud"
                  className={styleModalSucursal.floatingLabel}
                >
                  Latitud
                </label>
                <input
                  type="number"
                  name="latitud"
                  placeholder="Latitud"
                  value={latitud}
                  onChange={handleChange}
                  required
                  className={styleModalSucursal.inputElement}
                />
              </div>

              {/* LONGITUD*/}
              <div className={styleModalSucursal.inputField}>
                <label
                  htmlFor="longitud"
                  className={styleModalSucursal.floatingLabel}
                >
                  Longitud
                </label>
                <input
                  type="number"
                  name="longitud"
                  placeholder="Longitud"
                  value={longitud}
                  onChange={handleChange}
                  required
                  className={styleModalSucursal.inputElement}
                />
              </div>
              {/* NOMBRE DE LA CALLE*/}
              <div className={styleModalSucursal.inputField}>
                <label
                  htmlFor="nombreCalle"
                  className={styleModalSucursal.floatingLabel}
                >
                  Nombre de la Calle
                </label>
                <input
                  type="text"
                  name="nombreCalle"
                  placeholder=" "
                  value={nombreCalle}
                  onChange={handleChange}
                  required
                  className={styleModalSucursal.inputElement}
                />
              </div>

              {/* NUMERO DE LA CALLE*/}
              <div className={styleModalSucursal.inputField}>
                <label
                  htmlFor="numeroCalle"
                  className={styleModalSucursal.floatingLabel}
                >
                  N° Calle
                </label>
                <input
                  type="number"
                  name="numeroCalle"
                  placeholder="Numero de calle"
                  value={numeroCalle}
                  onChange={handleChange}
                  required
                  className={styleModalSucursal.inputElement}
                />
              </div>

              {/* CODIGO POSTAL*/}
              <div className={styleModalSucursal.inputField}>
                <label
                  htmlFor="codigoPostal"
                  className={styleModalSucursal.floatingLabel}
                >
                  CP
                </label>
                <input
                  type="number"
                  name="codigoPostal"
                  placeholder="Código Postal"
                  value={codigoPostal}
                  onChange={handleChange}
                  required
                  className={styleModalSucursal.inputElement}
                />
              </div>

              {/* NUMERO DE PISO*/}

              <div className={styleModalSucursal.inputField}>
                <label
                  htmlFor="numeroPiso"
                  className={styleModalSucursal.floatingLabel}
                >
                  N° Piso
                </label>
                <input
                  type="number"
                  name="numeroPiso"
                  placeholder="Ingresa un número de piso"
                  value={numeroPiso}
                  onChange={handleChange}
                  className={styleModalSucursal.inputElement}
                />
              </div>

              {/* NUMERO DE DEPARTAMENTO*/}
              <div className={styleModalSucursal.inputField}>
                <label
                  htmlFor="numeroDepartamento"
                  className={styleModalSucursal.floatingLabel}
                >
                  N° Dpto:
                </label>
                <input
                  type="number"
                  name="numeroDepartamento"
                  placeholder="Ingresa un número de departamento"
                  value={numeroDepartamento}
                  onChange={handleChange}
                  required
                  className={styleModalSucursal.inputElement}
                />
              </div>
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
