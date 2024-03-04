import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Alert from "./Alert";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const { state, dispatch: contextDispatch } = useContext(AuthContext);
  const { adminInfo } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin-dashboard");
    }
  }, [navigate, adminInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({ msg: "Rellena todos los campos", error: true });
      console.log("campos vacios");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/admin/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      contextDispatch({ type: "ADMIN_SIGNIN", payload: data });
      localStorage.setItem("adminInfo", JSON.stringify(data));
    } catch (error) {
      setAlert({ msg: error.response.data, error: true });
    }
  };
  const { msg } = alert;
  return (
    <div className="loginContainer">
      <form>
        <p className="loginHeader">Inicia sesión como administrador</p>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>{" "}
        <button type="submit" onClick={handleLogin} className="loginButton">
          INICIAR SESIÓN
          <span>
            <HiOutlineArrowNarrowRight />
          </span>
        </button>{" "}
        {msg && <Alert alert={alert} />}
      </form>
    </div>
  );
};

export default AdminLogin;
