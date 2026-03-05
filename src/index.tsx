import App from "@/App";
import "@/index.css";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Não foi possível encontrar o elemento root.");
}

const root = createRoot(rootElement);
root.render(<App />);
