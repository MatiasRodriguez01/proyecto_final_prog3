export interface IEmpresa {
  id: number;
  nombre: string;
  razonSocial: string;
  cuil: string;
  imagen: string | null;
  sucursales: string[];
}
