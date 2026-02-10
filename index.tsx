
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx'; // Adicionado .tsx para o Babel encontrar o arquivo

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Não foi possível encontrar o elemento root.");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
