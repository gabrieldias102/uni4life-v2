import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Conections from "./pages/Conections";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Publish from "./pages/Publish";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/conections" element={<Conections />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
