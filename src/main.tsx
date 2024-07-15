import React from "react";
import ReactDOM from "react-dom/client";
import customTheme from "./theme";
import { Flowbite } from 'flowbite-react'
import AppRoutes from "./routes";

import "./App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Flowbite theme={{theme: customTheme}}>
      <AppRoutes />
    </Flowbite>
  </React.StrictMode>,
);
