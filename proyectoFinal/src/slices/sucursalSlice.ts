import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { IUpdateSucursal } from "../types/dtos/sucursal/IUpdateSucursal";

interface sucursalState {
  sucursales: ISucursal[];
}

const initialState: sucursalState = {
  sucursales: [],
};

const sucursalSlice = createSlice({
  name: "sucursal",
  initialState,
  reducers: {
    setSucursales: (state, action: PayloadAction<ISucursal[]>) => {
      state.sucursales = action.payload;
    },
    actualizarSucursal: (state, action: PayloadAction<IUpdateSucursal>) => {
        const { id, nombre, idEmpresa, latitud, longitud, domicilio, logo, categorias, esCasaMatriz, horarioApertura, horarioCierre } = action.payload;
        
        const updatedDomicilio = {
            ...domicilio,
            localidad: null// Asegúrate de que 'localidad' esté presente
          };
        // Buscar el índice de la sucursal a actualizar
        const index = state.sucursales.findIndex(sucursal => sucursal.id === id);
      
        if (index !== -1) {
          // Actualizar los campos de la sucursal con los nuevos valores
          state.sucursales[index] = {
            ...state.sucursales[index],
            nombre,
            empresa: { ...state.sucursales[index].empresa, id: idEmpresa }, // Solo actualizamos el id de la empresa, ya que el resto de los datos de la empresa no están en IUpdateSucursal
            latitud,
            longitud,
            domicilio: updatedDomicilio, // Reemplazamos el domicilio completo con el nuevo valor
            logo,
            categorias,
            esCasaMatriz,
            horarioApertura,
            horarioCierre
          };
        }
      }
      
  },
});


export const { setSucursales, actualizarSucursal } = sucursalSlice.actions;
export default sucursalSlice.reducer;
