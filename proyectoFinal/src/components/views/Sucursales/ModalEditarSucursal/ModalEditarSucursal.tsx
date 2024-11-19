import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "../../../../hooks/useForm";
import { ServiceSucursal } from "../../../../services/ServiceSucursal";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";

import addImagen from "../../Empresas/ModalCrearEmpresa/imagen.png";
import styleModalSucursal from "../ModalCrearSucursal/ModalCrearSucursal.module.css";
import { IUpdateSucursal } from "../../../../types/dtos/sucursal/IUpdateSucursal";
import { IPais } from "../../../../types/IPais";
import { IProvincia } from "../../../../types/IProvincia";
import { ILocalidad } from "../../../../types/ILocalidad";
import { ServiceLocalizacion } from "../../../../services/ServiceLocalizacion";

interface IPopUpPropsEditarSucursal {
    sucursal: ISucursal;
    id: number;
    visible: boolean;
    onClose(): void;
}

export const ModalEditarSucursal: FC<IPopUpPropsEditarSucursal> = ({ sucursal, id, visible, onClose }) => {

    const serviceSucursal = new ServiceSucursal()

    const serviceLocalizacion = new ServiceLocalizacion()
    

    const [esCasaMatriz, setEsCasaMatriz] = useState(sucursal.esCasaMatriz)

    const [idLocalidad, setIdLocalidad] = useState<number>(0)

    const [paises, setPaises] = useState<IPais[]>([])
    const [provincias, setProvincias] = useState<IProvincia[]>([])
    const [localidades, setLocalidades] = useState<ILocalidad[]>([])

    const { values, handleChange, resetForm } = useForm({
        nombre: sucursal.nombre,
        horarioApertura: sucursal.horarioApertura,
        horarioCierre: sucursal.horarioCierre,
        pais: "",
        provincia: "",
        localidad: "",
        latitud: sucursal.latitud,
        longitud: sucursal.longitud,
        nombreCalle: sucursal.domicilio.calle,
        numeroCalle: sucursal.domicilio.numero,
        codigoPostal: sucursal.domicilio.cp,
        numeroPiso: sucursal.domicilio.piso,
        numeroDepartamento: sucursal.domicilio.nroDpto,
        imagen: String(sucursal.logo)
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
    
            if (responsePaises.length === 1){
              const selectedPaisId = responsePaises[0].id
              handlePaisChange({
                target: {value: String(selectedPaisId), name: "pais"},
              } as ChangeEvent<HTMLSelectElement>)
            }
          }catch(error){
            console.log("Error al obtener paises, ", error)
          }
        }
    
        if (visible){
          fetchPaises()
        }
      }, [visible])

      const handlePaisChange = async(event: ChangeEvent<HTMLSelectElement>) => {
        const selectedPaisId = Number(event.target.value)
        handleChange(event)
    
        try{
          const responseProvincias = await serviceLocalizacion.getProvincias(selectedPaisId)
          setProvincias(responseProvincias)
          console.log("provincias: ", provincias)
          setLocalidades([])
          setIdLocalidad(0)
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
          setIdLocalidad(0)
          console.log("Localidades: ", localidades)
        }catch(error){
          console.log("Error al obtener las provincias, ", error)
        }
      }

    const handleEditSucursal = async (newSucursal: IUpdateSucursal) => {
        try {
            await serviceSucursal.EditOneSucursal(newSucursal.id, newSucursal);
        } catch (error) {
            console.log("Error creando sucursal, ", error)
        }
    }

    const addForm = () => {
        const newSucursal: IUpdateSucursal = {
            id: sucursal.id,
            eliminado: sucursal.eliminado,
            nombre: nombre,
            idEmpresa: id,
            //eliminado: false,
            latitud: latitud,
            longitud: longitud,
            domicilio: {
                id: sucursal.domicilio.id,
                calle: nombreCalle,
                numero: numeroCalle,
                cp: codigoPostal,
                piso: numeroPiso,
                nroDpto: numeroDepartamento,
                idLocalidad: sucursal.domicilio.id,
            },
            logo: imagen,
            categorias: [],
            esCasaMatriz: esCasaMatriz,
            horarioApertura: horarioApertura,
            horarioCierre: horarioCierre,
        }
        handleEditSucursal(newSucursal)
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
                    <h2>Editar sucursal</h2>

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
              <select name="pais" value={pais} onChange={handlePaisChange} required>
                <option value="">Seleccione un País</option>
                {paises.map((pais) => (
                  <option key={pais.id} value={pais.id}>
                    {pais.nombre}
                  </option>
                ))}
              </select>
              {/* SELECCIONAR UNA PROVINCIA */}
              <select
                name="provincia"
                value={provincia}
                onChange={handleProvinciaChange}
                required
              >
                <option value="">Seleccione una Provincia</option>
                {provincias.map((prov) => (
                  <option key={prov.id} value={prov.id}>
                    {prov.nombre}
                  </option>
                ))}
              </select>
              {/* SELECCIONAR UNA LOCALIDAD */}
              <select
                name="localidad"
                value={idLocalidad || ""}
                onChange={(e) => setIdLocalidad(Number(e.target.value))}
                required
              >
                <option value="">Seleccione una Localidad</option>
                {localidades.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.nombre}
                  </option>
                ))}
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
