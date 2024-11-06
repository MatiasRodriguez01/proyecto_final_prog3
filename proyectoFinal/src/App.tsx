import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes/AppRouter"
import { Listado } from "./components/UI/Listado/Listado"

export const App = () => {
    return (
        // <BrowserRouter>
        //     <AppRouter />
        // </BrowserRouter>
        <Listado/>
    )
}
