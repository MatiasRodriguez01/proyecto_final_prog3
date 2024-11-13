import { ChangeEvent, FC} from 'react'
import styleModalEditar from './ModalEditarEmpresa.module.css'
import { IEmpresa } from '../../../../types/dtos/empresa/IEmpresa';
import { useForm } from '../../../../hooks/useForm';
import { ServiceEmpresa } from '../../../../services/ServiceEmpresa';
import { Button } from 'react-bootstrap';
import { IUpdateEmpresaDto } from '../../../../types/dtos/empresa/IUpdateEmpresaDto';


interface IProsEditarEmpresa {
    empresa: IEmpresa;
    visible: boolean;
    onClose: () => void;
}

export const ModalEditarEmpresa: FC<IProsEditarEmpresa> = ({ empresa, visible, onClose }) => {

    //const dispatch = useDispatch<AppDispatch>();
    const serviceEmpresa = new ServiceEmpresa();

    const { values, handleChange, resetForm } = useForm({
        nombre: empresa.nombre,
        razonSocial: empresa.razonSocial,
        cuit: empresa.cuit,
        logo: empresa.logo,
    });

    const handleEditarEmpresa = async (empresaEditar: IUpdateEmpresaDto) => {
        try {
            await serviceEmpresa.editOneEmpresa(empresaEditar.id, empresaEditar)
        } catch (error) {
            console.error("Error editar Empresa: ", error)
        }
        //onAddEmpresa(newEmpresa);
    };

    const addForm = () => {
        const newEmpresa: IUpdateEmpresaDto = {
            id: empresa.id,
            eliminado: false,
            nombre: values.nombre,
            razonSocial: values.razonSocial,
            cuit: values.cuit,
            logo: values.logo,
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
                            value={values.nombre}
                            onChange={handleChange}
                            required
                        />
                        {/* RAZON SOCIAL DE LA EMPRESA */}
                        <input
                            type="text"
                            name="razonSocial"
                            placeholder="Ingrese una razon social"
                            value={values.razonSocial}
                            onChange={handleChange}
                            required
                        />
                        {/* CUIL */}
                        <input
                            type="number"
                            name="cuit"
                            placeholder="Ingrese un cuil"
                            value={values.cuit}
                            onChange={handleChange}
                            required
                        />
                        {/* AGREGAR IMAGEN */}
                        <div className={styleModalEditar.imagenContainer}>
                            <input
                                type="text"
                                name="logo"
                                placeholder="Ingresa una imagen"
                                value={values.logo || undefined}
                                onChange={handleChange}
                            />
                            <img src={values.logo || undefined} alt="imagen del boton" />
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
