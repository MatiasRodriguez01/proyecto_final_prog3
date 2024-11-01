import { ISucursal } from "./ISucursal";

export interface IEmpresa {
  id: number;
  nombre: string;
  razonSocial: string;
  cuil: number;
  imagen: string;
  sucursales: ISucursal[];
}
