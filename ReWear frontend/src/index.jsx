import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import "./globals.css" // Import the global CSS
import { ThemeProvider } from "@/components/theme-provider" // Assuming you have a ThemeProvider
import { AuthProvider } from "./components/auth-provider.jsx"
import { Toaster } from "sonner" // Assuming sonner is used for toasts

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
