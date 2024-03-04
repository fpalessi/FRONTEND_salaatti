import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementProduct,
  reduceOrRemoveProduct,
} from "../redux/features/cart/cartSlice";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import Modal from "react-modal";

const customStyles = {
  content: {
    maxWidth: "500px",
    padding: "1rem",
    borderRadius: "1rem",
    margin: "1rem",
    border: "none",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const Cart = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { state } = useContext(AuthContext);
  const { userInfo } = state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  const cartTotalPrice = products.cart.reduce(
    (a, c) => a + c.quantity * c.price,
    0
  );

  const closeCart = () => {
    setCartOpen(null);
  };
  const handleCheckOut = async () => {
    setCartOpen(false);
    setModalOpen(true);
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
      user: userInfo._id,
      total: cartTotalPrice,
      quantity: products.cart.length,
    });
    localStorage.removeItem("cart");
    window.location.reload(false);
    navigate("/");
  };

  return (
    <>
      <div className="card" onClick={() => setCartOpen(!cartOpen)}>
        <CiShoppingCart className="cardIcon" />
      </div>
      <div className={cartOpen ? "overlay" : "nonoverlay"}></div>

      <div className={cartOpen ? "cartItem" : "cardhide"}>
        <div className="shoppingCartTitleContainer">
          <h2>Tu carta</h2>
          <button
            onClick={closeCart}
            style={{ background: "none", border: "none" }}
          >
            <CiCircleRemove />
          </button>
        </div>

        {products.cart.length === 0 ? (
          <p>Tu carta está vacía por ahora</p>
        ) : null}

        {products.cart.map((product) => {
          return (
            <div key={product._id} className="cartContent">
              <div className="img">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="details">
                <p>{product.title}</p>
                <label htmlFor="">Precio: {product.price}€</label>

                <div className="price">
                  <div className="qty flexCenter">
                    <button
                      className="minus"
                      onClick={() => dispatch(reduceOrRemoveProduct(product))}
                    >
                      <HiOutlineMinusSm />
                    </button>
                    <button className="num">{product.quantity}</button>

                    <button
                      className="plus"
                      onClick={() => dispatch(incrementProduct(product))}
                    >
                      <HiOutlinePlusSm />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {products.cart.length === 0 ? null : (
          <div className="checkOut">
            <button onClick={handleCheckOut}>
              <span>Finalizar pedido</span>
              <label htmlFor="">{cartTotalPrice}€</label>
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={modalOpen} style={customStyles}>
        <div>
          <h2>Enhorabuena.</h2>
          <p>Tu pedido se ha realizado con éxito.</p>
        </div>
      </Modal>
    </>
  );
};

export default Cart;
