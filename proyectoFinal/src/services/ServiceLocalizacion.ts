
import { ILocalidad } from '../types/ILocalidad';
import { IPais } from '../types/IPais';
import { IProvincia } from '../types/IProvincia';

export class ServiceLocalizacion {
  private baseURL: string;

  constructor() {
    //this.baseURL = 'http://localhost:8090/empresas';
    //this.baseURL = 'http://190.221.207.224:8090/empresas';
    this.baseURL = 'http://190.221.207.224:8090'

  }

  public async getPaises(): Promise<IPais[]> {
    const response = await fetch(`${this.baseURL}/paises`, {
      method: 'GET',
      headers: {
        "User-Agent" : "insomnia/9.3.2"
      },
    });
    const data = await response.json();
    return data;
  }

  public async getProvincias(idPais: number): Promise<IProvincia[]> {
    const response = await fetch(`${this.baseURL}/provincias/findByPais/${idPais}`, {
      method: 'GET',
      headers: {
        "User-Agent" : "insomnia/9.3.2"
      },
    });
    const data = await response.json();
    return data;
  }

  public async getLocalidades(idProvincia: number): Promise<ILocalidad[]> {
    const response = await fetch(`${this.baseURL}/localidades/findByProvincia/${idProvincia}`, {
      method: 'GET',
      headers: {
        "User-Agent" : "insomnia/9.3.2"
      },
    });
    const data = await response.json();
    return data;
  }



}
