import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Rute from "./Rute.jsx";
import "./main.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Rute />
    </React.StrictMode>
  </BrowserRouter>
);
