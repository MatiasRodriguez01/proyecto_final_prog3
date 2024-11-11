import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
link.rel = "stylesheet";
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
<<<<<<< HEAD
    <Provider store={store}>
      <App/>
    </Provider>
=======
    <App />
>>>>>>> rama_mati
  </StrictMode>
);
