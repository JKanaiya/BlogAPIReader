import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";

// const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(<App />);
