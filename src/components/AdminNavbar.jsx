import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminNavbar = () => {
  const { state, dispatch: contextDispatch } = useContext(AuthContext);
  const { adminInfo } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminInfo) {
      navigate("/");
    }
  }, [navigate, adminInfo]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/admin/logout`,
        {
          withCredentials: true,
        }
      );
      contextDispatch({ type: "ADMIN_SIGNOUT" });
      localStorage.removeItem("adminInfo");
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      <div>
        <p>ADMIN</p>
      </div>
      <button id="adminLogoutBtn" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default AdminNavbar;
