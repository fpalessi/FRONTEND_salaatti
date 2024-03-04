import { useEffect, useState } from "react";
import axios from "axios";

const ProductsTable = () => {
  const [listOfProducts, setListOfProducts] = useState(null);
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products`
      );
      setListOfProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Listado de Productos</h2>
      <table id="admin">
        <thead>
          <tr>
            <th scope="col">Nombre del plato</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listOfProducts?.length > 0 ? (
            listOfProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price} €</td>
                <td>
                  <button>Eliminar ✘</button>
                </td>
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

export default ProductsTable;
