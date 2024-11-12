import { ICategoria } from "./ICategoria";
export interface IProducto {
    id: string;
    denominacion: string;
    categoria: ICategoria ;
    imagen: string;
  }
  