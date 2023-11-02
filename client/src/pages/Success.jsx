import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
const Success = () => {
  // const location = useLocation();
  // //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  // const data = location.state.stripeData;
  // const cart = location.state.cart;
  //   const currentUser = useSelector((state) => state.user.currentUser);
  // const [orderId, setOrderId] = useState(null);

  // useEffect(() => {
  //   const createOrder = async () => {
  //     try {
  //       const res = await publicRequest.post("/orders", {
  //         //   userId: currentUser._id,
  //         products: cart.products.map((item) => ({
  //           productId: item._id,
  //           quantity: item._quantity,
  //         })),
  //         amount: cart.total,
  //         address: data.billing_details.address,
  //       });
  //       setOrderId(res.data._id);
  //     } catch {}
  //   };
  //   data && createOrder();
  // }, [cart, data]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      `Order has been created successfully. Your order number is`
      <Link to="/">
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Success;
