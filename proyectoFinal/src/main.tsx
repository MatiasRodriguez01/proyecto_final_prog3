import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Listado } from "./components/UI/Listado/Listado";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Listado />
  </StrictMode>
);
