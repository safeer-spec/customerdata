import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Userdata from "./pages/Userdata.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Userdata />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p className="p-8 text-center">Page not found</p>} />
        </Routes>
      </main>
    </>
  );
}
