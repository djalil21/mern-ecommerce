import Home from "./pages/Home";
import { ProductList } from "./pages/ProductList";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Cart } from "./pages/Cart";
import { Product } from "./pages/Product";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import ScrollToTop from "./ScrollToTop";
import Stripe from "./pages/Stripe";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/auth/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/auth/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/stripe"
          // element={<Stripe />}
          element={user ? <Stripe /> : <Navigate to="/auth/login" />}
        />
        <Route path="/success" element={<Success />} />
      </Routes>

      {/* <ProductList /> */}
      {/* <Product /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Cart /> */}
    </Router>
  );
}

export default App;
