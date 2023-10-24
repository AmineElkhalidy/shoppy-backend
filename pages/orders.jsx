import React, { useEffect, useState } from "react";
import OrdersTable from "@/components/OrdersTable";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <>
      <div className="p-4">
        <h2 className="text-3xl font-semibold">Orders</h2>
      </div>

      <div className="my-2">
        <OrdersTable orders={orders} />
      </div>
    </>
  );
};

export default Orders;
