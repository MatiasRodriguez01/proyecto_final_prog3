import { ChangeEvent, FC, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { ICategorias } from '../../../../../types/dtos/categorias/ICategorias';
import { ServiceCategorias } from '../../../../../services/ServiceCategorias';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { IUpdateCategoria } from '../../../../../types/dtos/categorias/IUpdateCategoria';
import { ISucursal } from '../../../../../types/dtos/sucursal/ISucursal';
import { useForm } from '../../../../../hooks/useForm';

import stylesEditarSubCategoria from "./ModalEditarSubCategoria.module.css";

interface IProsEditarCategoria {
    show: boolean;
    onClose: () => void;
    categoria: ICategorias,
    sucursales: ISucursal[]
}

export const ModalEditarSubCategoria: FC<IProsEditarCategoria> = ({ show, onClose, categoria, sucursales }) => {

    if (categoria !== null) {
        //const dispatch = useDispatch<AppDispatch>();
        const serviceCategoria = new ServiceCategorias();

        const empresaActiva = useSelector((state: RootState) => { return state.empresa.empresaActiva })

        const { values, handleChange, resetForm, setValues } = useForm({
            denominacion: categoria.denominacion || "",
            idEmpresa: empresaActiva?.id || 0,
            idCategoriaPadre: null
        });

        const sucursalIds = sucursales.map((sucursal) => sucursal.id)

        // Actualiza los valores del formulario si la empresa cambia
        useEffect(() => {
            if (categoria && show && empresaActiva) {
                setValues({
                    denominacion: categoria.denominacion,
                    idEmpresa: empresaActiva.id,
                    idCategoriaPadre: null
                });
            }
        }, [categoria]);

        const handleEditarCategoria = async (categoriaEditar: IUpdateCategoria) => {
            try {
                await serviceCategoria.editOneCategoria(categoriaEditar.id, categoriaEditar)
            } catch (error) {
                console.error("Error editar Empresa: ", error)
            }
            //onAddEmpresa(newEmpresa);
        };

        const addForm = () => {
            const newCategoria: IUpdateCategoria = {
                id: categoria.id,
                denominacion: values.denominacion,
                eliminado: false,
                idEmpresa: values.idEmpresa,
                idSucursales: sucursalIds
            };
            handleEditarCategoria(newCategoria);
            console.log(newCategoria.id)
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
        if (!show) {
            return null;
        }

        return (
            <Modal show={show} onHide={onClose}>
                <Modal.Header >
                    <Modal.Title>Crear/Editar Categoría</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Formulario para crear categoría */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="categoryName"
                                name="denominacion"
                                value={values.denominacion}
                                placeholder="Ingrese una denominacion"
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={cancelForm}
                        className={stylesEditarSubCategoria.botonCancelar}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        className={stylesEditarSubCategoria.botonAceptar}
                        form="categoryForm"
                        onClick={addForm}
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
