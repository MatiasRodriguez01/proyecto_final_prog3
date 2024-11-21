import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";


interface EmpresaState {
  empresas: IEmpresa[]; // Almacena la lista de empresas
  empresaActiva: IEmpresa | null;
};

const initialState: EmpresaState = {
  empresas: [],
  empresaActiva: null
};

const empresaSlice = createSlice({
  name: "empresa",
  initialState,
  reducers: {
    guardarEmpresas: (state, action: PayloadAction<IEmpresa[]>) => {
      state.empresas = action.payload;
    },
    empresaActiva: (state, action: PayloadAction<IEmpresa>) => {
      state.empresaActiva = action.payload;
      console.log("se creo la empresa activa")
    },
    eliminarEmpresaActiva: (state) => {
      state.empresaActiva = null;
    }
  }
})

export const { guardarEmpresas, empresaActiva, eliminarEmpresaActiva } = empresaSlice.actions;
export default empresaSlice.reducer;
