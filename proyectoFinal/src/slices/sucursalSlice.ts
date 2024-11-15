import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";

interface sucursalState {
  sucursales: ISucursal[];
  sucursalActiva: ISucursal | null;
}

const initialState: sucursalState = {
  sucursales: [],
  sucursalActiva: null
};
  
const sucursalSlice = createSlice({
  name: "sucursal",
  initialState,
  reducers: {
    guardarSucursales: (state, action: PayloadAction<ISucursal[]>) => {
      state.sucursales = action.payload;
    },
    sucursalActiva: (state, action: PayloadAction<ISucursal>) => {
      state.sucursalActiva = action.payload;
    },
    eliminarSucursalActiva: (state) => {
      state.sucursalActiva = null;
    }
  },
});


export const { guardarSucursales, sucursalActiva, eliminarSucursalActiva } = sucursalSlice.actions;
export default sucursalSlice.reducer;
