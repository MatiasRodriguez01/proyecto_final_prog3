import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlergenos } from "../types/dtos/alergenos/IAlergenos";

interface alergenoState {
  alergenos: IAlergenos[];
  alergenoActivo: IAlergenos | null;
  alergenoEditado: IAlergenos | null;
}

const initialState: alergenoState = {
  alergenos: [],
  alergenoActivo: null,
  alergenoEditado: null,
};

const alergenoSlice = createSlice({
  name: "alergeno",
  initialState,
  reducers: {
    guardarAlergenos: (state, action: PayloadAction<IAlergenos[]>) => {
      state.alergenos = action.payload;
    },
    alergenoActivo: (state, action: PayloadAction<IAlergenos | null>) => {
      state.alergenoActivo = action.payload;
    },
    editarAlergeno: (state, action: PayloadAction<IAlergenos | null>) => {
      state.alergenoEditado = action.payload;
    },
    actualizarAlergeno: (state, action) => {
      state.alergenos = state.alergenos.map((a) =>
        a.id === action.payload.id ? action.payload : a
      );
    },
  },
});

export const { guardarAlergenos, alergenoActivo, editarAlergeno, actualizarAlergeno } = alergenoSlice.actions;
export default alergenoSlice.reducer;
