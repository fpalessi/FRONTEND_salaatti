import { HiOutlinePlusSm } from "react-icons/hi";
import { HiOutlineMinusSm } from "react-icons/hi";
import { HiX } from "react-icons/hi";

import { useDispatch, useSelector } from "react-redux";
import {
  incrementProduct,
  reduceOrRemoveProduct,
} from "../redux/features/cart/cartSlice";

const CartItems = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  const cartTotalPrice = products.cart.reduce(
    (a, c) => a + c.quantity * c.price,
    0
  );
  return (
    <>
      {products.cart.map((product) => {
        return (
          <div className="cartContent" key={product.id}>
            <div className="img">
              <img src={product.cover} alt="imagen previa de ensalada" />
              <button className="remove flexCenter">
                <HiX />
              </button>
            </div>
            <div className="details">
              <p>{product.name}</p>
              <label htmlFor="">Unit Price ${product.price}</label>

              <div className="price">
                <div className="qty flexCenter">
                  <button
                    className="plus"
                    onClick={() => dispatch(incrementProduct(product))}
                  >
                    <HiOutlinePlusSm />
                  </button>
                  <button className="num">1{product.quantity}</button>
                  <button
                    className="minus"
                    onClick={() => dispatch(reduceOrRemoveProduct(product))}
                  >
                    <HiOutlineMinusSm />
                  </button>
                </div>
                <div className="priceTitle">{cartTotalPrice}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CartItems;
