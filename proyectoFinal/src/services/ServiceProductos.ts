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
      const response = await fetch(this.baseURL, {
        method: 'GET',
        headers: {
          "User-Agent" : "insomnia/9.3.2"
        },
      });
      const data = await response.json();
      return data;
  }  
  
  public async getAllProductosPorSucursal(idSucursal: number): Promise<IProductos[]> {
    const response = await fetch(`${this.baseURL}/porSucursal/${idSucursal}`, {
      method: 'GET',
      headers: {
        "User-Agent" : "insomnia/9.3.2"
      },
    });
    const data = await response.json();
    return data;
  }


  public async getProducto(id: number): Promise<IProductos> {
    const response = await fetch(`${this.baseURL}/${id}`, {
      method: 'GET',
      headers: {
        "User-Agent" : "insomnia/9.3.2"
      },
    });
    const data = await response.json();
    return data;
  }
    public async createOneProducto(producto: ICreateProducto): Promise<IUpdateProducto> {
        const response = await fetch(`${this.baseURL}/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' ,
            "User-Agent" : "insomnia/9.3.2"
          },
          body: JSON.stringify(producto)
        });
        const data = await response.json();
        return data;
      }
    
      public async editOneProducto(id: number, producto: IUpdateProducto): Promise<IUpdateProducto> {
        const response = await fetch(`${this.baseURL}/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json' ,
            "User-Agent" : "insomnia/9.3.2"
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
        if (response.ok) {
          // Si no se espera cuerpo, no hacemos .json()
          if (response.status === 204) {
            // Si la respuesta es vacía (204 No Content), solo regresamos sin hacer nada
            return;
          }
      
          // Si la respuesta tiene un cuerpo JSON, entonces lo procesamos
          const data = await response.json();
          return data;
        } else {
          // Manejo de error en caso de que la respuesta no sea exitosa
          throw new Error('Error en la respuesta de la API');
        }
      }
    
}