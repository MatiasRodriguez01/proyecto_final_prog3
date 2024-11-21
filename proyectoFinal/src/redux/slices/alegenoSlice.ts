import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";

interface alergenoState {
  alergenos: IAlergenos[];
  alergenoActivo: IAlergenos | null;
  alergenoEditado: IAlergenos | null;
  alergenoEliminado: IAlergenos | null;
}

const initialState: alergenoState = {
  alergenos: [],
  alergenoActivo: null,
  alergenoEditado: null,
  alergenoEliminado: null,
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
    eliminarAlergeno: (state, action: PayloadAction<IAlergenos | null>) => {
      state.alergenoEliminado = action.payload;
    }
  },
});

export const { guardarAlergenos, alergenoActivo, editarAlergeno, eliminarAlergeno } = alergenoSlice.actions;
export default alergenoSlice.reducer;
