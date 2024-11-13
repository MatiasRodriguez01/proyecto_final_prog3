import { ICreateEmpresaDto } from '../types/dtos/empresa/ICreateEmpresaDto';
import { IEmpresa } from '../types/dtos/empresa/IEmpresa';
import { IUpdateEmpresaDto } from '../types/dtos/empresa/IUpdateEmpresaDto';

export class ServiceEmpresa {
  private baseURL: string;

  constructor() {
    //this.baseURL = 'http://localhost:8090/empresas';
    //this.baseURL = 'http://190.221.207.224:8090/empresas';
    this.baseURL = 'http://190.221.207.224:8090'

  }

  // public async getAllEmpresas(): Promise<AxiosResponse<IEmpresa[]>> {
  //   return axios.get(this.baseURL);
  // }

  public async getAllEmpresas(): Promise<IEmpresa[]> {
    const response = await fetch(`${this.baseURL}/empresas`);
    const data = await response.json();
    return data;
  }

  // momstrar una empresa
  public async getEmpresa(id: number): Promise<IEmpresa> {
    const response = await fetch(`${this.baseURL}/empresas/${id}`);
    const data = await response.json();
    return data;
  }

  public async createOneEmpresa(empresa: ICreateEmpresaDto): Promise<IEmpresa> {
    const response = await fetch(`${this.baseURL}/empresas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(empresa)
    });
    const data = await response.json();
    return data as IEmpresa;
  }

  public async editOneEmpresa(id: number, empresa: IUpdateEmpresaDto): Promise<IUpdateEmpresaDto> {
    const response = await fetch(`${this.baseURL}/empresas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "User-Agent" : "insomnia/9.3.1"
      },
      body: JSON.stringify(empresa)
    });
    const data = await response.json();
    return data; 
  }
}
