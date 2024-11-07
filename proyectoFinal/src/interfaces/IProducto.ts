import { ICategoria } from "./ICategoria";
export interface IAlergeno {
    id: string;
    denominacion: string;
    categoria: ICategoria ;
    imagen: string;
  }
  