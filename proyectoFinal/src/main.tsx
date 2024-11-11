import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
<<<<<<< HEAD
// import "@fontsource/material-symbols-outlined";
import store from "../src/store/store"
import { Provider } from "react-redux";
=======

>>>>>>> de8d42904c482b8cbfeef0643525fc82d6c54d43

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
>>>>>>> de8d42904c482b8cbfeef0643525fc82d6c54d43
  </StrictMode>
);
