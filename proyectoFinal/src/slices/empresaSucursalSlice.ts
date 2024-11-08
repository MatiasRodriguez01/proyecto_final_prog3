import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IEmpresa } from '../types/dtos/empresa/IEmpresa';
import { ICreateEmpresaDto } from '../types/dtos/empresa/ICreateEmpresaDto';
import { ServiceEmpresa } from '../services/EmpresaService';

const serviceEmpresa = new ServiceEmpresa();

interface EmpresaSucursalState {
  empresaActiva: IEmpresa | null;
  empresas: IEmpresa[];
}

const initialState: EmpresaSucursalState = {
  empresaActiva: null,
  empresas: [],
};

// Acción asíncrona para crear una nueva empresa
export const createEmpresa = createAsyncThunk(
  'empresaSucursal/createEmpresa',
  async (empresaData: ICreateEmpresaDto, { rejectWithValue }) => {
    try {
      const response = await serviceEmpresa.createOneEmpresa(empresaData);
      return response.data as IEmpresa;
    } catch (error: any) {
      console.error("Error creando empresa:", error.message);
      return rejectWithValue(error.message);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmpresa.fulfilled, (state, action) => {
        state.empresas.push(action.payload);
        state.empresaActiva = action.payload;
      });
  },
});

export const { setEmpresaActiva } = empresaSucursalSlice.actions;
export default empresaSucursalSlice.reducer;
