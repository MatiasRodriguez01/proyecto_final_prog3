import React, { ChangeEvent, FC } from 'react'
import { ICreateEmpresaDto } from '../../../../types/dtos/empresa/ICreateEmpresaDto'
import styleModalEditar from './ModalEditarEmpresa.module.css'
import { IEmpresa } from '../../../../types/dtos/empresa/IEmpresa';
import { useForm } from '../../../../hooks/useForm';
import { ServiceEmpresa } from '../../../../services/EmpresaService';
import { Button } from 'react-bootstrap';

interface IProsEditarEmpresa {
    empresa: ICreateEmpresaDto;
    onClose: () => void;
}

export const ModalEditarEmpresa: FC<IProsEditarEmpresa> = ({ empresa, onClose }) => {

    //const dispatch = useDispatch<AppDispatch>();
  const serviceEmpresa = new ServiceEmpresa();

  const { values, handleChange, resetForm } = useForm({
    nombre: "",
    razonSocial: "",
    cuil: 0,
    imagen: "",
  });

  const { nombre, razonSocial, cuil, imagen } = values;

  const handleCreateEmpresa = async (empresa: IEmpresa) => {

    try {
      await serviceEmpresa.createOneEmpresa(empresa)
    } catch (error) {
      console.error("Error crear Empresa: ", error)
    }
    //onAddEmpresa(newEmpresa);
  };



  const addForm = () => {
    const newEmpresa: IEmpresa = {
      id: Date.now(),
      nombre: nombre,
      razonSocial: razonSocial,
      cuit: cuil,
      logo: imagen,
      sucursales: [],
      pais: null
    };
    handleCreateEmpresa(newEmpresa);
    console.log(newEmpresa.id)
    resetForm(); // Cerrar el modal
    onClose()
  }  

  const cancelForm = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

    return (
        <div className={styleModalEditar.containerPopUp}>
            <div className={styleModalEditar.popUpContainer}>
                <div className={styleModalEditar.contenido}>
                    <h2>Crear empresa</h2>

                    {/* FORMULARIO PARA AGREGAR EMPRESA */}
                    <form
                        onSubmit={handleSubmit}
                        className={styleModalEditar.formulario}
                    >
                        {/* NOMBRE DE LA EMPRESA */}
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Ingrese un nombre"
                            value={empresa.nombre}
                            onChange={handleChange}
                            required
                        />
                        {/* RAZON SOCIAL DE LA EMPRESA */}
                        <input
                            type="text"
                            name="razonSocial"
                            placeholder="Ingrese una razon social"
                            value={empresa.razonSocial}
                            onChange={handleChange}
                            required
                        />
                        {/* CUIL */}
                        <input
                            type="number"
                            name="cuil"
                            placeholder="Ingrese un cuil"
                            value={empresa.cuit}
                            onChange={handleChange}
                            required
                        />
                        {/* AGREGAR IMAGEN */}
                        <div className={styleModalEditar.imagenContainer}>
                            <input
                                type="text"
                                name="imagen"
                                placeholder="Ingresa una imagen"
                                value={empresa.logo || undefined}
                                onChange={handleChange}
                            />
                            <img src={empresa.logo || undefined} alt="imagen del boton" />
                            {/* AGREGAR FUNCIONALIDAD PARA SUBIR UNA IMAGEN */}
                        </div>
                        <div className={styleModalEditar.containerButtonsForm}>
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={addForm}
                                className={styleModalEditar.formButton}
                            >
                                Enviar
                            </Button>{" "}
                            <Button
                                variant="primary"
                                onClick={cancelForm}
                                className={styleModalEditar.formButton}
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
