import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
// import "@fontsource/material-symbols-outlined";

const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
link.rel = "stylesheet";
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
