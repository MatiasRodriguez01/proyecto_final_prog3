import { Route, Routes } from "react-router"
import { Hearder } from "../components/screen/Header"
import { Categoria } from "../components/screen/Categoria"
import { Producto } from "../components/screen/Producto"
import { Alogenos } from "../components/screen/Alogenos"
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
