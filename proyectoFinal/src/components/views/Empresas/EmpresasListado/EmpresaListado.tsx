import { FC } from 'react';
import { useInformacion } from '../../../../hooks/useInformacion';
import { IEmpresa } from '../../../../types/dtos/empresa/IEmpresa'
import EmpresaCard from '../EmpresaCard/EmpresaCard'
import { EmpresaInfo } from '../EmpresaInfo/EmpresaInfo';
import styleListado from './EmpresaListado.module.css'
import ModalCrearEmpresa from '../ModalCrearEmpresa/ModalCrearEmpresa';
import { usePopUpVisible } from '../../../../hooks/usePopUpVisible';

interface IPropsListado {
    empresas: IEmpresa[];
    EmpresaActiva: Function;
}


export const EmpresaListado: FC<IPropsListado> = ({ empresas, EmpresaActiva }) => {
    const { informacion, mostrarInformacion, cerrarInformacion } = useInformacion();
    const { isPopUpVisible, HandlePopUp } = usePopUpVisible();

    return (
        <>
            <div className={styleListado.titulo}>
                <h2>Empresas</h2>
            </div>
            <button
                type="button"
                onClick={HandlePopUp}
                className={styleListado.agregarEmpresa}
            >
                AGREGAR EMPRESAS
                <span className="material-symbols-outlined">add</span>
            </button>
            <hr />
            <div className={styleListado.listaEmpresa}>
                <div className={styleListado.titulo}>
                    <h4>Lista de Empresas</h4>
                </div>
                {empresas.length !== 0 ? (
                    empresas.map((e) => (
                        <div className={styleListado.empresasCardContainer} key={e.id}>
                            <EmpresaCard
                                empresa={e}
                                onVerEmpresa={() => mostrarInformacion(e.id)}
                                onEmpresaActiva={EmpresaActiva}
                            />
                            {informacion === e.id && (
                                <EmpresaInfo
                                    empresa={e}
                                    onVerEmpresa={cerrarInformacion}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <p>No hay empresas</p>
                )}
            </div>

            <ModalCrearEmpresa
                visible={isPopUpVisible}
                onClose={HandlePopUp}
            />
        </>

    )
}