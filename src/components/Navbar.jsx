import { useContext, useState } from "react";
import { Link } from "react-scroll";
import { CiMenuFries } from "react-icons/ci";
import { data } from "../constants.json";
import Cart from "./Cart";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { state, dispatch: contextDispatch } = useContext(AuthContext);
  const { userInfo } = state;
  const handleLogOut = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/user/logout`, {
        withCredentials: true,
      });
      contextDispatch({ type: "USER_SIGNOUT", payload: data });
      localStorage.removeItem("userInfo");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav>
      <div className="logo">salaattinurkkaus</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          {data[0].navbarLinks.map((element) => {
            return (
              <Link
                to={element.link}
                key={element.id}
                spy={true}
                smooth={true}
                duration={500}
              >
                {element.title}
              </Link>
            );
          })}
          {userInfo ? (
            <Link to="/" onClick={handleLogOut}>
              CERRAR SESIÓN
            </Link>
          ) : null}
        </div>
        {userInfo ? <Cart /> : null}
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <CiMenuFries />
      </div>
    </nav>
  );
};

export default Navbar;
