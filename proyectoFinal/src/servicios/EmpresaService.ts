import axios, { AxiosResponse } from 'axios';
import { IUpdateEmpresaDto } from '../types/dtos/empresa/IUpdateEmpresaDto';
import { ICreateEmpresaDto } from '../types/dtos/empresa/ICreateEmpresaDto';

export class ServiceEmpresa {
  private baseURL: string;

  constructor() {
    this.baseURL = 'http://190.221.207.224:8090/empresas';
  }

  public async getIsEmpresaMatriz(id: number): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/existEmpresaMatriz/${id}`;
    return axios.get(url, {
      headers: {
        'User-Agent': 'insomnia/9.3.2',
      },
    });
  }

  public async createOneEmpresa(empresa: ICreateEmpresaDto): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}`;
    return axios.post(url, empresa, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async editOneEmpresa(id: number, empresa: IUpdateEmpresaDto): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/update/${id}`;
    return axios.put(url, empresa, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async getAllEmpresas(): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}`;
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
