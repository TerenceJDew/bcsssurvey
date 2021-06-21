import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Store from "./store/store";

// Entry Point of the Application
// Applicatin Logic is handled inside Container

const Index = () => (
  <Store>
    <App />
  </Store>
);
ReactDOM.render(<Index />, document.getElementById("root"));
