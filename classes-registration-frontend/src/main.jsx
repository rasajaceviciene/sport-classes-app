// src/main.jsx

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { AppProvider } from "./context";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <App />
  </AppProvider>
);

