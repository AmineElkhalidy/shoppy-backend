import React, { useEffect, useState } from "react";
import OrdersTable from "@/components/OrdersTable";
import Header from "@/components/Header";
import SidebarNavigation from "@/components/SidebarNavigation";
import axios from "axios";
import { useSession } from "next-auth/react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <div className="relative w-full bg-gray-200 min-h-screen flex">
      <SidebarNavigation setIsCollapsed={setIsCollapsed} />

      <div className={`grow ${isCollapsed ? "pl-[5rem]" : "pl-[15.5rem]"}`}>
        <Header session={session} />
        <>
          <div className="p-4">
            <h2 className="text-3xl font-semibold">Orders</h2>
          </div>

          <div className="my-2">
            <OrdersTable orders={orders} />
          </div>
        </>
      </div>
    </div>
  );
};

export default Orders;
