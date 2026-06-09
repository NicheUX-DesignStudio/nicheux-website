// src/main.tsx - ORIGINAL VERSION
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import './globals/ios-only.css';
import './globals/mobile-carousels.css';

// Add this for better error handling
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find root element. Check if index.html has <div id='root'></div>");
}

// Clear any existing content (for hot reload)
rootElement.innerHTML = '';

const root = ReactDOM.createRoot(rootElement);

function preloadAndReady() {
  if (typeof (window as any).__nxReady === 'function') (window as any).__nxReady();
}

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  preloadAndReady();
} catch (error) {
  console.error("Failed to render App:", error);
  rootElement.innerHTML = `
    <div style="color: white; background: #121212; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif;">
      <div style="text-align: center; padding: 2rem;">
        <h1 style="color: #B097BE; margin-bottom: 1rem;">Application Error</h1>
        <p>Sorry, something went wrong. Please refresh the page.</p>
        <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #B097BE; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Refresh Page
        </button>
      </div>
    </div>
  `;
}

