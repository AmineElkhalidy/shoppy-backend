import React, { useState } from "react";

// Authentication functionalities
import { signIn, signOut, useSession } from "next-auth/react";

// Components
import SidebarNavigation from "./SidebarNavigation";

// Icons
import {
  BellAlertIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/outline";

// Next Components
import Link from "next/link";
import Header from "./Header";

const Layout = ({ children }) => {
  const { data: session } = useSession();

  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!session) {
    return (
      <div className="bg-mainColor min-h-screen flex items-center justify-center">
        <button
          className="bg-yellowColor py-3 px-6 text-black rounded-lg inline-flex gap-3 items-center"
          onClick={() => signIn("google")}
        >
          <img
            className="w-8 h-8 "
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
