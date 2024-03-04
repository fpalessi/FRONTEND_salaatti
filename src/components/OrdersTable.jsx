import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";

const OrdersTable = () => {
  const [listOfOrders, setListOfOrders] = useState(null);
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/orders`
      );
      setListOfOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Listado de Pedidos</h2>
      <table id="admin">
        <thead>
          <tr>
            <th scope="col">Número de pedido</th>
            <th scope="col">Identificador de usuario</th>
            <th scope="col">Nº de platos</th>
            <th scope="col">Coste total</th>
            <th scope="col">Fecha del pedido</th>
          </tr>
        </thead>
        <tbody>
          {listOfOrders?.length > 0 ? (
            listOfOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user}</td>
                <td>{order.quantity}</td>
                <td>{order.total}€</td>
                <td>{format(new Date(order.createdAt), "MM-dd-yyyy")}</td>
              </tr>
            ))
          ) : (
            <p>Tabla vacía</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
