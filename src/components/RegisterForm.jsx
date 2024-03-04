import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import axios from "axios";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if ([name, email, password, passwordConfirmation].includes("")) {
      setAlert({ msg: "Rellena todos los campos", error: true });
      return;
    }
    setAlert({});
    try {
      await axios.post("/users/register", {
        name,
        email,
        password,
        passwordConfirmation,
      });
      navigate("/success");
    } catch (error) {
      console.log(error);
      setAlert({ msg: error.response.data[0].message, error: true });
    }
  };
  const { msg } = alert;
  return (
    <form>
      <div>
        <input
          type="string"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="string"
          placeholder="Email"
          className="email_tag"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Contraseña"
          className="email_tag"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>
      <button type="submit" onClick={handleRegister}>
        REGISTRARSE
        <span>
          <HiOutlineArrowNarrowRight />
        </span>
      </button>{" "}
      {msg && <Alert alert={alert} />}
    </form>
  );
};

export default RegisterForm;
