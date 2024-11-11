import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
import { IUpdateEmpresaDto } from "../types/dtos/empresa/IUpdateEmpresaDto";

interface EmpresaState {
  empresas: IEmpresa[]; // Almacena la lista de empresas
}

const initialState: EmpresaState = {
  empresas: [],
};

const empresaSlice = createSlice({
  name: "empresa",
  initialState,
  reducers: {
    // Reemplaza la lista de empresas en el estado
    setEmpresas: (state, action: PayloadAction<IEmpresa[]>) => {
      state.empresas = action.payload;
    },
    // Actualiza una empresa existente en el array `empresas`
    actualizarEmpresa: (state, action: PayloadAction<IUpdateEmpresaDto>) => {
      const index = state.empresas.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        state.empresas[index] = { ...state.empresas[index], ...action.payload };
      }
    },
  },
});

export const { setEmpresas, actualizarEmpresa } = empresaSlice.actions;
export default empresaSlice.reducer;
