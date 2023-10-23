import React, { useState } from "react";

// Authentication functionalities
import { signIn, signOut, useSession } from "next-auth/react";

// Components
import SidebarNavigation from "./SidebarNavigation";

import Header from "./Header";

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!session) {
    return (
      <div className="bg-mainColor min-h-screen flex items-center justify-center">
        <button
          className="bg-orange-500 py-4 px-6 text-white text-2xl rounded-lg inline-flex gap-3 items-center duration-300 hover:bg-orange-700"
          onClick={() => signIn("google")}
        >
          <img
            className="w-10 h-10"
            src="/images/Logos/google.png"
            alt="Google Logo"
          />{" "}
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-gray-200 min-h-screen flex">
      {/* Sidebar */}
      <SidebarNavigation setIsCollapsed={setIsCollapsed} />

      <div className={`grow ${isCollapsed ? "pl-[5rem]" : "pl-[15.5rem]"}`}>
        <Header session={session} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
