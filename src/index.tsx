import App from "@/App";
import "@/index.css"; // <--- ESTA LINHA É ESSENCIAL
import React from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Não foi possível encontrar o elemento root.");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
