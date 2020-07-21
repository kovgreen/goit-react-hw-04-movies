import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
