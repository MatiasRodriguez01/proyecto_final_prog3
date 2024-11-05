import { Route, Routes } from "react-router"
import { Hearder } from "../components/views/Header/Header"
import { Categoria } from "../components/views/Categoria/Categoria"
import { Producto } from "../components/views/Producto/Producto"
import { Alogenos } from "../components/views/Alogenos/Alogenos"
import { FC } from "react"

interface IProsProtectedRoutes {
    isBack: () => void;
  }
  

export const ProtectedRoutes: FC<IProsProtectedRoutes> = ({ isBack }) => {
    return (
        <>
            <Hearder isBack={isBack} />
            <Routes>
                <Route path="/categoria" element={<Categoria/>} />
                <Route path="/producto" element={<Producto/>} />
                <Route path="/alogeno" element={<Alogenos/>} />
            </Routes>
        </>
    )
}
