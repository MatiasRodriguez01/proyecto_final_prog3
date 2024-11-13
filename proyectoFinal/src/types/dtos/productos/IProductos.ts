
import { IImagen } from "../../IImagen";
import { IAlergenos } from "../alergenos/IAlergenos";
import { ICategorias } from "../categorias/ICategorias";

export interface IProductos {
  id: number;
  denominacion: string;
  categoria: ICategorias;
  alergenos: IAlergenos[];
  precioVenta: number;
  codigo: string;
  habilitado: boolean;
  descripcion: string;
  imagenes: IImagen[];
  eliminado: boolean;
}
