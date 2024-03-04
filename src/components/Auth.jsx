import Alert from "./Alert";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const { state } = useContext(AuthContext);
  const { userInfo } = state;
  const { msg } = alert;

  return (
    <>
      {userInfo ? null : (
        <section className="reservation" id="reservation">
          <div className="container">
            <div className="banner">
              <img src="/intro1.png" alt="res" id="authImg" />
            </div>
            <div className="banner">
              <div className="reservation_form_box">
                {msg && <Alert alert={alert} />}
                <h1>ÚNETE Y HAZ TU PRIMER PEDIDO</h1>
                <p>Regístrate y sacia tu apetito de manera sana</p>
                <RegisterForm />
                <LoginForm />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Auth;
