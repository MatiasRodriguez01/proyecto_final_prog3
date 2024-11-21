import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductos } from "../../types/dtos/productos/IProductos";

interface productoState {
  productos: IProductos[];
  productoActivo: IProductos | null;
  productoEditado: IProductos | null;
}

const initialState: productoState = {
  productos: [],
  productoActivo: null,
  productoEditado: null,
};

const productoSlice = createSlice({
  name: "producto",
  initialState,
  reducers: {
    guardarProductos: (state, action: PayloadAction<IProductos[]>) => {
      state.productos = action.payload;
    },
    productoActivo: (state, action: PayloadAction<IProductos | null>) => {
      state.productoActivo = action.payload;
    },
    editarProducto: (state, action: PayloadAction<IProductos | null>) => {
      state.productoEditado = action.payload;
    },
    actualizarProducto: (state, action) => {
      state.productos = state.productos.map((a) =>
        a.id === action.payload.id ? action.payload : a
      );
    },
  },
});

export const { guardarProductos, productoActivo, editarProducto, actualizarProducto } = productoSlice.actions;
export default productoSlice.reducer;