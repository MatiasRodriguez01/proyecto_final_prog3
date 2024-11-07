import { configureStore } from "@reduxjs/toolkit";
import empresaSucursalReducer from '../slices/empresaSucursalSlice'



const store = configureStore({
    reducer:{
        empresaSucursal: empresaSucursalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store