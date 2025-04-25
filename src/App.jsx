import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/layout/Layout";
import ProductDetails from "./pages/ProductDetails";
import RoomDesigner from "./pages/RoomDesigner";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute, { AdminRoute } from "./components/ProtectedRoute";

// Import other pages as they are created
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import AdminDashboard from "./components/AdminDashboard";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/room-designer" element={<RoomDesigner />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      </AppProvider>
    </Router>
  );
}

export default App;
