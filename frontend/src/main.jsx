import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/store";
import Fetchdata from "./Fetchdata";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Fetchdata>
        <App />
      </Fetchdata>
    </Provider>
  </BrowserRouter>,
);
