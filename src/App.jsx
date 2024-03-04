import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Success from "./pages/Success";
import AdminLogin from "./components/AdminLogin";
import Admin from "./pages/Admin";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <SkeletonTheme>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<Admin />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </SkeletonTheme>
    </>
  );
}

export default App;
