import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Player from "./components/Player";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Layout>
        <App />
        <Player id="player" file="https://plrjs.com/sample.mp4" />
      </Layout>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
