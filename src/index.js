import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Store from "./store/store";

const Index = () => (
  <Store>
    <App />
  </Store>
);
ReactDOM.render(<Index />, document.getElementById("root"));
