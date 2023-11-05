import React, { useState } from "react";
import { useSession } from "next-auth/react";
import SidebarNavigation from "./SidebarNavigation";
import Header from "./Header";

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div className="relative w-full bg-gray-200 min-h-screen flex">
        <SidebarNavigation setIsCollapsed={setIsCollapsed} />

        <div className={`grow ${isCollapsed ? "pl-[5rem]" : "pl-[15.5rem]"}`}>
          <Header session={session} />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
