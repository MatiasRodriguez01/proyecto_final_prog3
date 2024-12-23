import { configureStore } from "@reduxjs/toolkit";
import empresaReducer from "../slices/empresaSlice";
import sucursalReducer from "../slices/sucursalSlice";
import alergenoReducer from '../slices/alegenoSlice'
import categoriaReducer from '../slices/categoriaSlice'
import productoReducer from '../slices/productoSlice'

const store = configureStore({
  reducer: {
    empresa: empresaReducer, // Aquí se añade el reducer de la slice
    sucursal: sucursalReducer,
    alergeno :alergenoReducer,
    categoria: categoriaReducer,
    producto: productoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Exporta los tipos para uso en el componente y en el dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
