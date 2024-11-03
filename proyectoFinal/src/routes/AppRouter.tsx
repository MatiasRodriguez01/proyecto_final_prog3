import { useState } from "react"
import { Route, Routes } from "react-router"
import { Listado } from "../components/UI/Listado/Listado";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const AppRouter = () => {

    const [isLoggin, setIsloggin] = useState<boolean>(false);

    const cambiarRuta = () => {
        console.log(isLoggin)
        setIsloggin(!isLoggin)
    }

  return (
    <>
        <Routes>
            {
                isLoggin ? (
                    <Route path="/*" element={<ProtectedRoutes isBack={cambiarRuta}/>} />
                ) : (
                    <Route  path="/*" element={<Listado isLoggin={cambiarRuta}/>} />
                )
            }
        </Routes>
    </>
  )
}
