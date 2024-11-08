import { FC } from "react";
import styleInfo from "./EmpresaInfo.module.css"
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";

interface IEmpresaInfo {
    // nombre: string;
    // razonSocial: string;
    // cuil: number;
    // imagen: string;
    empresa: IEmpresa;
    onVerEmpresa: () => void;
}

export const EmpresaInfo: FC<IEmpresaInfo> = ({ empresa, onVerEmpresa }) => {
    return (
        <div className={styleInfo.containerPopInfo}>
            <div className={styleInfo.container}>
                <div className="card" style={{ width: "20rem"}}>
                    {empresa.logo && (
                        <img src={empresa.logo} className="card-img-top" alt="..."></img>
                    )}

                    <div className="card-body">
                        <h5 className="card-title" style={{textAlign:'center' }}>{empresa.nombre}</h5>
                        <hr />
                        <p className="card-text"><strong>Razon Social:</strong> {empresa.razonSocial}</p>
                        <p className="card-text"><strong>Cuil:</strong> {empresa.cuit}</p>
                        <button className="btn btn-primary" onClick={onVerEmpresa}>Cerrar</button>
                    </div>

                </div>
            </div>
        </div>
    )

}