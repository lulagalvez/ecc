import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "fontsource-montserrat"; //fuente font montserrat regular
import "bootstrap/dist/css/bootstrap.min.css"; // react boostrap css , empaquetado

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
