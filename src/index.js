import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Layout>
        <App />
      </Layout>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
