import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Listado } from "./components/UI/Listado/Listado";
// import "@fontsource/material-symbols-outlined"; 

const link = document.createElement('link');
link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
link.rel = "stylesheet";
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Listado />
  </StrictMode>
);
