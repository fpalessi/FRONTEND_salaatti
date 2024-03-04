import { useNavigate } from "react-router-dom";
import ProductsTable from "../components/ProductsTable";
import UsersTable from "../components/UsersTable";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import OrdersTable from "../components/OrdersTable";
import AdminNavbar from "../components/AdminNavbar";

const Admin = () => {
  const { state } = useContext(AuthContext);
  const { adminInfo } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminInfo) {
      navigate("/");
    }
  }, [navigate, adminInfo]);

  return (
    <>
      <AdminNavbar />
      <div className="adminContainer">
        <UsersTable />
        <ProductsTable />
        <OrdersTable />
      </div>
    </>
  );
};

export default Admin;
