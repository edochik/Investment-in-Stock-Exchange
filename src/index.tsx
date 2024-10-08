import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./style/global.scss";
import App from "./app/App";
import { store } from "./redux";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
