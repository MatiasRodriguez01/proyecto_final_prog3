import { IUpdateSucursal } from "../types/dtos/sucursal/IUpdateSucursal";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal";

export class ServiceSucursal {
  private baseURL: string;

  constructor() {
    this.baseURL = "http://190.221.207.224:8090";
  }

  public async createOneSucursal(sucursal: ICreateSucursal): Promise<ISucursal> {
    const response = await fetch(`${this.baseURL}/sucursales/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/9.3.2",
      },
      body: JSON.stringify(sucursal),
    });
    const data = await response.json();
    return data;
  }

  public async getAllSucursalesByEmpresa(idEmpresa: number): Promise<ISucursal[]> {
    const response = await fetch(
      `${this.baseURL}/sucursales/porEmpresa/${idEmpresa}`,
      {
        method: "GET",
        headers: {
          "User-Agent": "insomnia/9.3.2",
        },
      }
    );
    const data = await response.json();
    return data;
  }

  public async EditOneSucursal(idSucursal: number,newSucursal: IUpdateSucursal): Promise<IUpdateSucursal> {
    const response = await fetch(
      `${this.baseURL}/sucursales/update/${idSucursal}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "insomnia/9.3.2",
        },
        body: JSON.stringify(newSucursal),
      }
    );
    const data = await response.json();
    return data;
  }
}
