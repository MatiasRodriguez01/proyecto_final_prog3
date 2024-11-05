import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes/AppRouter"
//import { ProtectedRoutes } from "./routes/ProtectedRoutes"

// import { Correo } from "./components/Correo"

export const App = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
        //<ProtectedRoutes/>
    )
}
