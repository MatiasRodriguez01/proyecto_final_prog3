import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IEmpresa } from '../types/dtos/empresa/IEmpresa';
import { ISucursal } from '../types/dtos/sucursal/ISucursal';
import { ICreateEmpresaDto } from '../types/dtos/empresa/ICreateEmpresaDto';
import { ICreateSucursal } from '../types/dtos/sucursal/ICreateSucursal';
import { ServiceEmpresa } from '../servicios/EmpresaService';
import { ServiceSucursal } from '../servicios/SucursalService';
import axios from 'axios';


// Instancias de los servicios
const serviceEmpresa = new ServiceEmpresa();
const serviceSucursal = new ServiceSucursal();

interface EmpresaSucursalState {
  empresaActiva: IEmpresa | null;
  sucursalActiva: ISucursal | null;
  empresas: IEmpresa[];
  sucursales: ISucursal[];
}

const initialState: EmpresaSucursalState = {
  empresaActiva: null,
  sucursalActiva: null,
  empresas: [],
  sucursales: [],
};

// Acción para crear una nueva empresa
export const createEmpresa = createAsyncThunk(
    'empresaSucursal/createEmpresa',
    async (empresaData: ICreateEmpresaDto, { rejectWithValue }) => {
      try {
        const response = await serviceEmpresa.createOneEmpresa(empresaData);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Simplifica el error para que sea serializable
          return rejectWithValue({ message: error.message, code: error.code });
        }
        return rejectWithValue({ message: 'Unknown error' });
      }
    }
  );
// Acción para crear una nueva sucursal
export const createSucursal = createAsyncThunk(
  'empresaSucursal/createSucursal',
  async (sucursalData: ICreateSucursal, { rejectWithValue }) => {
    try {
      const response = await serviceSucursal.createOneSucursalByEmpresa(sucursalData);
      return response.data; // Retorna los datos de la sucursal creada
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const empresaSucursalSlice = createSlice({
  name: 'empresaSucursal',
  initialState,
  reducers: {
    setEmpresaActiva(state, action: PayloadAction<IEmpresa>) {
      state.empresaActiva = action.payload;
    },
    setSucursalActiva(state, action: PayloadAction<ISucursal>) {
      state.sucursalActiva = action.payload;
    },
    clearEmpresaActiva(state) {
      state.empresaActiva = null;
    },
    clearSucursalActiva(state) {
      state.sucursalActiva = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmpresa.fulfilled, (state, action) => {
        // Actualizar el estado con la empresa recién creada
        state.empresas.push(action.payload);
        state.empresaActiva = action.payload; // Opcional: establecer la empresa creada como activa
      })
      .addCase(createSucursal.fulfilled, (state, action) => {
        // Actualizar el estado con la sucursal recién creada
        state.sucursales.push(action.payload);
        state.sucursalActiva = action.payload; // Opcional: establecer la sucursal creada como activa
      });
  },
});

export const {
  setEmpresaActiva,
  setSucursalActiva,
  clearEmpresaActiva,
  clearSucursalActiva,
} = empresaSucursalSlice.actions;

export default empresaSucursalSlice.reducer;