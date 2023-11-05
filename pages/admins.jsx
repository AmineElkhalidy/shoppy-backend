import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import SidebarNavigation from "@/components/SidebarNavigation";

const Admins = () => {
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="relative w-full bg-gray-200 min-h-screen flex">
      <SidebarNavigation setIsCollapsed={setIsCollapsed} />

      <div className={`grow ${isCollapsed ? "pl-[5rem]" : "pl-[15.5rem]"}`}>
        <Header session={session} />

        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold">Admins</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admins;
