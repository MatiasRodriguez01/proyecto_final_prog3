import { ICreateAlergeno } from "../types/dtos/alergenos/ICreateAlergeno";
import { ICreateProducto } from "../types/dtos/productos/ICreateProducto";
import { IProductos } from "../types/dtos/productos/IProductos";
import { IUpdateProducto } from "../types/dtos/productos/IUpdateProducto";

export class ServiceProductos{

    private baseURL: string;

  constructor() {
    //this.baseURL = 'http://localhost:8090/empresas';
    //this.baseURL = 'http://190.221.207.224:8090/empresas';
    this.baseURL = 'http://190.221.207.224:8090/articulos'

  }

  public async getAllProductos(): Promise<IProductos[]> {
    const response = await fetch(this.baseURL);
    const data = await response.json();
    return data;
  }  
  
  public async getAllProductosPorSucursal(idSucursal: number): Promise<IProductos[]> {
    const response = await fetch(`${this.baseURL}/porSucursal/${idSucursal}`);
    const data = await response.json();
    return data;
  }


  public async getProducto(id: number): Promise<IProductos> {
    const response = await fetch(`${this.baseURL}/${id}`);
    const data = await response.json();
    return data;
  }
    public async createOneProducto(producto: ICreateProducto): Promise<IUpdateProducto> {
        const response = await fetch(`${this.baseURL}/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(producto)
        });
        const data = await response.json();
        return data;
      }
    
      // public async editOneEmpresa(id: number, empresa: IUpdateEmpresaDto): Promise<AxiosResponse<IEmpresa>> {
      //   return axios.put(`${this.baseURL}/update/${id}`, empresa, {
      //     headers: { 'Content-Type': 'application/json' },
      //   });
      // }
    
      public async editOneProducto(id: number, producto: IUpdateProducto): Promise<IUpdateProducto> {
        const response = await fetch(`${this.baseURL}/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(producto)
        });
        const data = await response.json();
        return data; 
      }

      public async deleteProductoById(id: number): Promise<void>{
        const response = await fetch(`${this.baseURL}/${id}`, {
          method: 'DELETE',
          headers: {
            "User-Agent" : "insomnia/10.1.0"
          }
        });
        const data = response.json();
        return data;
      }
    
}