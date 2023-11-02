/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./widgetlg.css";
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";

const Button = ({ type }) => {
  return <button className={"widgetLgButton " + type}>{type}</button>;
};

const WidgetLg = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("order");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);

  return (
    <div className="widgetlg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Order ID</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">{order.userId}</td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">{order.amount}</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WidgetLg;
