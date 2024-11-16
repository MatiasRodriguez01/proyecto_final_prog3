import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlergenos } from "../types/dtos/alergenos/IAlergenos";
import { ICategorias } from "../types/dtos/categorias/ICategorias";

interface categoriaState {
  categorias: ICategorias[];
  categoriaActiva: ICategorias | null;
  categoriaEditada: ICategorias | null;
}

const initialState: categoriaState = {
  categorias: [],
  categoriaActiva: null,
  categoriaEditada: null,
};

const categoriaSlice = createSlice({
  name: "categoria",
  initialState,
  reducers: {
    guardarCategorias: (state, action: PayloadAction<ICategorias[]>) => {
      state.categorias = action.payload;
    },
    categoriaActiva: (state, action: PayloadAction<ICategorias | null>) => {
      state.categoriaActiva = action.payload;
    },
    editarCategoria: (state, action: PayloadAction<ICategorias | null>) => {
      state.categoriaEditada = action.payload;
    },
    actualizarCategoria: (state, action) => {
      state.categorias = state.categorias.map((a) =>
        a.id === action.payload.id ? action.payload : a
      );
    },
  },
});

export const { guardarCategorias, categoriaActiva, editarCategoria, actualizarCategoria } = categoriaSlice.actions;
export default categoriaSlice.reducer;
