import About from "../components/About";
import Qualities from "../components/Qualities";
import MenuList from "../components/MenuList";
import Team from "../components/Team";
import Auth from "../components/Auth";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { state } = useContext(AuthContext);
  const { adminInfo } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin-dashboard");
    }
  }, [navigate, adminInfo]);
  return (
    <>
      <Navbar />
      <Auth />
      <About />
      <Qualities />
      <MenuList />
      <Team />
      <Footer />
    </>
  );
};

export default Home;
