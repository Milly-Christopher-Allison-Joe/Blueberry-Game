import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./layout/Layout.jsx";

import { AuthProvider } from "./auth/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Layout>
        <App />
      </Layout>
    </AuthProvider>
  </BrowserRouter>
);
