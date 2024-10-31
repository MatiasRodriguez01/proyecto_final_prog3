import { FC } from "react";
import styleInfo from "./EmpresaInfo.module.css"

interface IEmpresaInfo {
    nombre: string;
    razonSocial: string;
    cuil: number;
    imagen: string;
    onVerEmpresa: () => void;
}

export const EmpresaInfo: FC<IEmpresaInfo> = ({ nombre, razonSocial, cuil, imagen, onVerEmpresa }) => {
    return (
        <div className={styleInfo.containerPopInfo}>
            <div className={styleInfo.container}>
                <div className="card" style={{ width: "18rem", height: 'auto' }}>
                    {imagen && (
                        <img src={imagen} className="card-img-top" alt="..."></img>
                    )}

                    <div className="card-body" style={{ height: 'auto' }}>
                        <h5 className="card-title" style={{ height: 'auto', textAlign:'center' }}>{nombre}</h5>
                        <hr />
                        <p className="card-text" style={{ height: 'auto' }}><strong>Razon Social:</strong> {razonSocial}</p>
                        <p className="card-text" style={{ height: 'auto' }}><strong>Cuil:</strong> {cuil}</p>
                        <button className="btn btn-primary" onClick={onVerEmpresa} style={{ height: 'auto' }}>Cerrar</button>
                    </div>

                </div>
            </div>
        </div>
    )

}