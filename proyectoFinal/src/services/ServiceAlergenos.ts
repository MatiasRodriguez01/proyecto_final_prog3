import { IAlergenos } from "../types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../types/dtos/alergenos/IUpdateAlergeno";

export class ServiceAlergenos{

    private baseURL: string;

  constructor() {
    this.baseURL = 'http://190.221.207.224:8090/alergenos'

  }

    public async createOneAlergeno(alergeno: ICreateAlergeno): Promise<IUpdateAlergeno> {
        const response = await fetch(`${this.baseURL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(alergeno)
        });
        const data = await response.json();
        return data;
      }

      public async getAllAlergenos(): Promise<IAlergenos[]> {
        const response = await fetch(`${this.baseURL}`);
        const data = await response.json();
        return data;
      }
    

      public async getAlergeno(id: number): Promise<IAlergenos> {
        const response = await fetch(`${this.baseURL}/${id}`);
        const data = await response.json();
        return data;
      }
    
      public async editOneAlergeno(id: number, alergeno: IUpdateAlergeno): Promise<IUpdateAlergeno> {
        const response = await fetch(`${this.baseURL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(alergeno)
        });
        const data = await response.json();
        return data; 
      }
    
}