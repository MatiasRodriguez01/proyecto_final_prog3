
import axios, { AxiosResponse } from 'axios'
import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal";
import { IUpdateSucursal } from '../types/dtos/sucursal/IUpdateSucursal';

export class ServiceSucursal {
    private baseURL: string;
  
    constructor() {
      this.baseURL = 'http://190.221.207.224:8090/sucursales';
    }
  

    public async getIsCasaMatriz(id: number): Promise<AxiosResponse<any>> {
      const url = `${this.baseURL}/existCasaMatriz/${id}`;
      return axios.get(url, {
        headers: {
          'User-Agent': 'insomnia/9.3.2',
        },
      });
    }
  

    public async createOneSucursalByEmpresa(sucursal: ICreateSucursal): Promise<AxiosResponse<any>> {
      const url = `${this.baseURL}/create`;
      return axios.post(url, sucursal, {
        headers: {
          'Content-Type': 'application/json',
          //'User-Agent': 'insomnia/9.3.2',
        },
      });
    }
  

    public async editOneSucursal(id: number, sucursal: IUpdateSucursal): Promise<AxiosResponse<any>> {
      const url = `${this.baseURL}/update/${id}`;
      return axios.put(url, sucursal, {
        headers: {
          'Content-Type': 'application/json',
          //'User-Agent': 'insomnia/9.3.2',
        },
      });
    }
  

    public async getAllSucursalesByEmpresa(idEmpresa: number): Promise<AxiosResponse<any>> {
      const url = `${this.baseURL}/porEmpresa/${idEmpresa}`;
      return axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          //'User-Agent': 'insomnia/9.3.2',
        },
      });
    }
  }