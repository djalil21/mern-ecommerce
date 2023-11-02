import "./app.css";
import Home from "./pages/Home/Home";
import Users from "./pages/users/Users";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Products from "./pages/products/Products";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/newProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import DashboardLayout from "./pages/DashboardLayout";
function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={admin ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={!admin ? <Navigate to="/login" /> : <DashboardLayout />}
        >
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="user/:userId" element={<User />} />
          <Route path="newuser" element={<NewUser />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="newproduct" element={<NewProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
