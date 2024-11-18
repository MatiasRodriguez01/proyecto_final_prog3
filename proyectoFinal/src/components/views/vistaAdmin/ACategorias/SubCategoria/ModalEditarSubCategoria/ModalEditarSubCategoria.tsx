import { ChangeEvent, FC, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { ICategorias } from '../../../../../../types/dtos/categorias/ICategorias';
import { ServiceCategorias } from '../../../../../../services/ServiceCategorias';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../store/store';
import { IUpdateCategoria } from '../../../../../../types/dtos/categorias/IUpdateCategoria';
import { ISucursal } from '../../../../../../types/dtos/sucursal/ISucursal';
import { useForm } from '../../../../../../hooks/useForm';

import stylesEditarSubCategoria from "./ModalEditarSubCategoria.module.css";
import { subCategoriaActiva } from '../../../../../../slices/categoriaSlice';

interface IProsEditarCategoria {
    subCategoria: ICategorias | null,
    show: boolean;
    onClose: () => void;
}

export const ModalEditarSubCategoria: FC<IProsEditarCategoria> = ({ subCategoria, show, onClose }) => {

    if (subCategoria !== null) {

        const dispatch = useDispatch();

        const serviceCategoria = new ServiceCategorias();

        const empresaActiva = useSelector((state: RootState) => { return state.empresa.empresaActiva })

        const { values, handleChange, resetForm, setValues } = useForm({
            denominacion: subCategoria.denominacion || "",
            idEmpresa: empresaActiva?.id || 0,
            idCategoriaPadre: null
        });

        const sucursales: ISucursal[] = subCategoria?.sucursales || [];

        const idSucursales: number[] = sucursales.map((sucursal) => Number(sucursal.id));
        
        // Actualiza los valores del formulario si la empresa cambia
        useEffect(() => {
            if (subCategoria && show && empresaActiva) {
                setValues({
                    denominacion: subCategoria.denominacion,
                    idEmpresa: empresaActiva.id,
                    idCategoriaPadre: null
                });
            }
        }, [subCategoria]);

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
                id: subCategoria.id,
                denominacion: values.denominacion,
                eliminado: false,
                idEmpresa: values.idEmpresa,
                idSucursales: idSucursales,
            };
            handleEditarCategoria(newCategoria);
            console.log(newCategoria.id)
            resetForm(); // Cerrar el modal
            onClose()
        }
        const cancelForm = () => {
            dispatch(subCategoriaActiva(null))
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
