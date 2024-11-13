import { ChangeEvent, FC} from 'react'
import styleModalEditar from './ModalEditarEmpresa.module.css'
import { IEmpresa } from '../../../../types/dtos/empresa/IEmpresa';
import { useForm } from '../../../../hooks/useForm';
import { ServiceEmpresa } from '../../../../services/ServiceEmpresa';
import { Button } from 'react-bootstrap';
import { IUpdateEmpresaDto } from '../../../../types/dtos/empresa/IUpdateEmpresaDto';
import { useDispatch } from 'react-redux';

import { actualizarEmpresa } from '../../../../slices/empresaSlice';

interface IProsEditarEmpresa {
    empresa: IEmpresa;
    visible: boolean;
    onClose: () => void;
}

export const ModalEditarEmpresa: FC<IProsEditarEmpresa> = ({ empresa, visible, onClose }) => {

    // dispatch para actualizar la empresa
    const dispatch = useDispatch()

    //const dispatch = useDispatch<AppDispatch>();
    const serviceEmpresa = new ServiceEmpresa();

    const { values, handleChange, resetForm } = useForm({
        nombre: empresa.nombre,
        razonSocial: empresa.razonSocial,
        cuil: empresa.cuit,
        imagen: empresa.logo,
    });

    const { nombre, razonSocial, cuil, imagen } = values;

    const handleEditarEmpresa = async (empresaEditar: IUpdateEmpresaDto) => {
        try {
            await serviceEmpresa.editOneEmpresa(empresaEditar.id, empresaEditar)
            dispatch(actualizarEmpresa(empresaEditar))
        } catch (error) {
            console.error("Error editar Empresa: ", error)
        }
        //onAddEmpresa(newEmpresa);
    };

    const addForm = () => {
        const newEmpresa: IUpdateEmpresaDto = {
            id: empresa.id,
            eliminado: false,
            nombre: nombre,
            razonSocial: razonSocial,
            cuit: cuil,
            logo: imagen,
        };
        handleEditarEmpresa(newEmpresa);
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

    // Si no está visible, no renderiza nada
    if (!visible) {
        return null;
    }

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
                            value={nombre}
                            onChange={handleChange}
                            required
                        />
                        {/* RAZON SOCIAL DE LA EMPRESA */}
                        <input
                            type="text"
                            name="razonSocial"
                            placeholder="Ingrese una razon social"
                            value={razonSocial}
                            onChange={handleChange}
                            required
                        />
                        {/* CUIL */}
                        <input
                            type="number"
                            name="cuil"
                            placeholder="Ingrese un cuil"
                            value={cuil}
                            onChange={handleChange}
                            required
                        />
                        {/* AGREGAR IMAGEN */}
                        <div className={styleModalEditar.imagenContainer}>
                            <input
                                type="text"
                                name="imagen"
                                placeholder="Ingresa una imagen"
                                value={imagen || undefined}
                                onChange={handleChange}
                            />
                            <img src={imagen || undefined} alt="imagen del boton" />
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
