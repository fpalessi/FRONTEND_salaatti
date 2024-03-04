/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { addItem } from "../redux/features/cart/cartSlice";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MenuItem = ({ data }) => {
  const { state } = useContext(AuthContext);
  const { userInfo } = state;
  const dispatch = useDispatch();

  const handleAddProductToCart = () => {
    dispatch(addItem(data));
  };

  return (
    <div className="card">
      <img src={data.image} alt={data.title} />
      <h3 style={{ textAlign: "center" }}>{data.title}</h3>
      {userInfo ? (
        <button onClick={handleAddProductToCart}>
          <HiOutlinePlusSm />
        </button>
      ) : null}
    </div>
  );
};

export default MenuItem;
