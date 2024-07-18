import React from "react";
import ReactDOM from "react-dom/client";
import customTheme from "./theme";
import { Flowbite } from 'flowbite-react'
import AppRoutes from "./routes";
import store from "@storage/store";
import { Provider } from "react-redux";

import "./App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Flowbite theme={{theme: customTheme}}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </Flowbite>
  </React.StrictMode>,
);
