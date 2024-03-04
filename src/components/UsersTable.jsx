import { useEffect, useState } from "react";
import axios from "axios";

const UsersTable = () => {
  const [listOfUsers, setListOfUsers] = useState(null);
  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users`
      );
      setListOfUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <h2>Listado de Usuarios</h2>
      <table id="admin">
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Nombre</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listOfUsers?.length > 0 ? (
            listOfUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.name}</td>
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

export default UsersTable;
