import { FC } from 'react';
import styleInfo from "../../Empresas/EmpresaInfo/EmpresaInfo.module.css"
import { ISucursal } from '../../../../types/dtos/sucursal/ISucursal';

interface IPropsSucursalInfo {
    sucursal: ISucursal;
    onVerSucursal: () => void;
}

export const Sucursalnfo: FC<IPropsSucursalInfo> = ({ sucursal, onVerSucursal }) => {
    return (
        <div className={styleInfo.containerPopInfo}>
            <div className={styleInfo.container} style={{overflowY:'scroll'}}>
                <div className="card" style={{ width: "18rem", height: 'auto' }}>
                    {sucursal.logo && (
                        <img src={sucursal.logo} className="card-img-top" alt="..."></img>
                    )}

                    <div className="card-body" style={{ height: 'auto' }}>
                        <h5 className="card-title" style={{ height: 'auto', textAlign: 'center' }}>Sucursal</h5>
                        <hr />
                        <p className="card-text" style={{ height: 'auto' }}><strong>Nombre:</strong> {sucursal.nombre}</p>
                        <p className="card-text" style={{ height: 'auto' }}><strong>Horario de Apertura:</strong> {sucursal.horarioApertura}</p>
                        <p className="card-text" style={{ height: 'auto' }}><strong>Horario de Cierre:</strong> {sucursal.horarioCierre}</p>
                        <button className="btn btn-primary" onClick={onVerSucursal} style={{ height: 'auto' }}>Cerrar</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
