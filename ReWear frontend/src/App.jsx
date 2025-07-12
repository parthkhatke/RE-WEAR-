"use client"

import { Routes, Route } from "react-router-dom"
import { LandingPage } from "./components/landing-page.jsx"
import { AuthPage } from "./components/auth-page.jsx"
import AdminPage from "./pages/AdminPage.jsx"
import AddItemPage from "./pages/AddItemPage.jsx"
import ItemPage from "./pages/ItemPage.jsx"
import WishlistPage from "./pages/WishlistPage.jsx"
import MessagesPage from "./pages/MessagesPage.jsx"
import DashboardPage from "./pages/DashboardPage.jsx"
import BrowsePage from "./pages/BrowsePage.jsx"
import { useAuth } from "./components/auth-provider.jsx"
import { LoadingSpinner } from "./components/loading-spinner.jsx"

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Protected routes - render AuthPage if not logged in */}
      {user ? (
        <>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/add-item" element={<AddItemPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/browse" element={<BrowsePage />} />
        </>
      ) : (
        <Route path="*" element={<AuthPage />} />
      )}
    </Routes>
  )
}

export default App
