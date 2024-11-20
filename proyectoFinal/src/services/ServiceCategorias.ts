import { ICategorias } from '../types/dtos/categorias/ICategorias';
import { ICreateCategoria } from '../types/dtos/categorias/ICreateCategoria';
import { IUpdateCategoria } from '../types/dtos/categorias/IUpdateCategoria';
import { IEmpresa } from '../types/dtos/empresa/IEmpresa';

export class ServiceCategorias {
  private baseURL: string;

  constructor() {
    //this.baseURL = 'http://localhost:8090/empresas';
    //this.baseURL = 'http://190.221.207.224:8090/empresas';
    this.baseURL = 'http://190.221.207.224:8090/categorias'

  }

  public async getAllCategorias(): Promise<ICategorias[]> {
    const response = await fetch(this.baseURL);
    const data = await response.json();
    return data;
  }

  public async getAllSubcategoriasPorCategoriaPadre(idSucursal: number, idCategoriaPadre: number): Promise<ICategorias[]> {
    const response = await fetch(`${this.baseURL}/allSubCategoriasPorCategoriaPadre/${idSucursal}/${idCategoriaPadre}`);
    const data = await response.json();
    return data;
  }

  public async getAllSubcategoriasPorSucursal(idSucursal: number): Promise<ICategorias[]> {
    const response = await fetch(`${this.baseURL}/allSubCategoriasPorSucursal/${idSucursal}`);
    const data = await response.json();
    return data;
  }

  public async getAllCategoriasPadrePorSucursal(idSucursal: number): Promise<ICategorias[]> {
    const response = await fetch(`${this.baseURL}/allCategoriasPorSucursal/${idSucursal}`);
    const data = await response.json();
    return data;
  }

  public async getCategoriasPorEmpresa(idEmpresa: number): Promise<ICategorias[]> {
    const response = await fetch(`${this.baseURL}/allCategoriasPorEmpresa/${idEmpresa}`);
    const data = await response.json();
    return data;
  }

  public async getCategoria(id: number): Promise<IEmpresa> {
    const response = await fetch(`${this.baseURL}/${id}`);
    const data = await response.json();
    return data;
  }

  public async createOneCategoria(categoria: ICreateCategoria): Promise<IUpdateCategoria> {
    const response = await fetch(`${this.baseURL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(categoria)
    });
    const data = await response.json();
    return data;
  }

  public async editOneCategoria(id: number, categoria: IUpdateCategoria): Promise<IUpdateCategoria> {
    const response = await fetch(`${this.baseURL}/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(categoria)
    });
    const data = await response.json();
    return data; 
  }
}
