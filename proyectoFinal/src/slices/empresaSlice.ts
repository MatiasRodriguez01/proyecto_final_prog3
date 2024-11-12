import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
import { IUpdateEmpresaDto } from "../types/dtos/empresa/IUpdateEmpresaDto";
import { ICreateEmpresaDto } from "../types/dtos/empresa/ICreateEmpresaDto";
import { ServiceEmpresa } from "../services/ServiceEmpresa";

const serviceEmpresa = new ServiceEmpresa();

interface EmpresaState {
  empresas: IEmpresa[]; // Almacena la lista de empresas
};

const initialState: EmpresaState = {
  empresas: [],
};

export const crearEmpresaAsync = createAsyncThunk<IEmpresa, ICreateEmpresaDto>(
  'empresa/crearEmpresa',
  async (empresa: ICreateEmpresaDto) => {
    // Cambié el tipo de retorno a IEmpresa
    const newEmpresa = await serviceEmpresa.createOneEmpresa(empresa);
    return newEmpresa; // Aquí asegúrate de que 'newEmpresa' sea de tipo 'IEmpresa'
  }
);

const empresaSlice = createSlice({
  name: "empresa",
  initialState,
  reducers: {
    setEmpresas: (state, action: PayloadAction<IEmpresa[]>) => {
      state.empresas = action.payload;
    },
    actualizarEmpresa: (state, action: PayloadAction<IUpdateEmpresaDto>) => {
      const index = state.empresas.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        state.empresas[index] = { ...state.empresas[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(crearEmpresaAsync.fulfilled, (state, action) => {
      state.empresas.push(action.payload); // Agrega la nueva empresa con el ID generado
    });
  }
});

export const { setEmpresas, actualizarEmpresa } = empresaSlice.actions;
export default empresaSlice.reducer;
