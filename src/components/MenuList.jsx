import MenuItem from "./MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../redux/features/product/productThunk";
import MenuSkeleton from "./MenuSkeleton";

const MenuList = () => {
  const dispatch = useDispatch();

  const { products, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className="menu" id="menu">
      <div className="container">
        <div className="heading_section">
          <h1 className="heading">NUESTRAS ENSALADAS</h1>
          <p>
            Nuestras ensaladas son mucho más que una mezcla de ingredientes
            frescos; son una experiencia culinaria que despierta los sentidos.
          </p>
          <br />
          <p>Regístrate para poder añadir estas ensaladas a tu menú.</p>
        </div>
        <div className="dishes_container">
          {isLoading ? <MenuSkeleton cards={15} /> : null}
          {products ? (
            products.map((product) => (
              <MenuItem key={product._id} data={product} />
            ))
          ) : (
            <p>Sorry, we could not find anything</p>
          )}
          {!isLoading && error ? (
            <h3 style={{ color: "#EE4266" }}>
              Hemos tenido un problema al mostrarte nuestras ensaladas. Por
              favor, vuelve a intentarlo más tarde
            </h3>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default MenuList;
