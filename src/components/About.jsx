import { Link } from "react-scroll";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="banner">
          <div className="top">
            <h1 className="heading">SOBRE NOSOTROS</h1>
            <p>
              Sabores del norte, frescura en cada bocado. ¡tu nuevo placer
              saludable!
            </p>
          </div>

          <p className="mid">
            Somos una pequeña empresa finlandesa que ha llegado para conquistar
            tus papilas gustativas con la frescura del norte. Ensaladas que no
            solo son una explosión de sabores, sino también una celebración de
            la calidad y la nutrición.
            <br />
            Imagina recibir en la puerta de tu hogar una deliciosa combinación
            de ingredientes frescos y cuidadosamente seleccionados. Desde la
            crujiente lechuga hasta los tomates jugosos, cada bocado es una
            experiencia única que te transportará a los exuberantes campos de
            Finlandia.
          </p>
          <Link
            to={"menu"}
            spy={true}
            smooth={true}
            duration={500}
            style={{ cursor: "pointer" }}
          >
            Ver Menú
            <span>
              <HiOutlineArrowNarrowRight />
            </span>
          </Link>
        </div>
        <div className="banner">
          <img src="/intro4.png" alt="about" />
        </div>
      </div>
    </section>
  );
};

export default About;
