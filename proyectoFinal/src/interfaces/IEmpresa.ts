import { ISucursal } from "./ISucursal";

export interface IEmpresa {
  id: string;
  nombre: string;
  razonSocial: string;
  cuil: number;
  imagen: string;
  sucursales: ISucursal[];
}
