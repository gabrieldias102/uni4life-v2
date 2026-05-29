import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Conections from "./pages/Conections";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Publish from "./pages/Publish";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import { getHealth } from "./services";

function AppRoutes() {
  const location = useLocation();
  const shouldShowNavbar = !["/login", "/register"].includes(location.pathname);

  return (
    <>
      {shouldShowNavbar ? <Navbar /> : null}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/conections"
          element={
            <ProtectedRoute>
              <Conections />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publish"
          element={
            <ProtectedRoute>
              <Publish />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile posts={[]} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  useEffect(() => {
    getHealth()
      .then((response) => {
        console.log("Acesso à API:", response.status);
      })
      .catch((error) => {
        console.error("Erro ao consultar /health:", error);
      });
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
