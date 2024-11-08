import axios, { AxiosResponse } from 'axios';
import { IUpdateEmpresaDto } from '../types/dtos/empresa/IUpdateEmpresaDto';
import { ICreateEmpresaDto } from '../types/dtos/empresa/ICreateEmpresaDto';
import { IEmpresa } from '../types/dtos/empresa/IEmpresa';

export class ServiceEmpresa {
  private baseURL: string;

  constructor() {
    //this.baseURL = 'http://localhost:8090/empresas';
    this.baseURL = 'http://190.221.207.224:8090/empresas';

  }

  public async getAllEmpresas(): Promise<AxiosResponse<IEmpresa[]>> {
    return axios.get(this.baseURL);
  }

  public async createOneEmpresa(empresa: ICreateEmpresaDto): Promise<AxiosResponse<any>> {
    console.log("Payload enviado a la API:", empresa)
    return axios.post(this.baseURL, empresa, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public async editOneEmpresa(id: number, empresa: IUpdateEmpresaDto): Promise<AxiosResponse<IEmpresa>> {
    return axios.put(`${this.baseURL}/update/${id}`, empresa, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
