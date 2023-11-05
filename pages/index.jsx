import { useSession } from "next-auth/react";
import { useState } from "react";
import Login from "./login";
import Header from "@/components/Header";
import SidebarNavigation from "@/components/SidebarNavigation";

export default function Home() {
  // rename data to session
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <div className="relative w-full bg-gray-200 min-h-screen flex">
          <SidebarNavigation setIsCollapsed={setIsCollapsed} />

          <div className={`grow ${isCollapsed ? "pl-[5rem]" : "pl-[15.5rem]"}`}>
            <Header session={session} />
            <div className="p-4">
              <div className="flex items-center">
                <div>
                  <h1 className="text-4xl font-semibold">
                    Welcome Back,{" "}
                    <span className="text-orange-500">
                      {session ? session?.user?.name : "John Doe"}
                    </span>
                  </h1>

                  <h2 className="text-3xl font-medium mt-4">Dashboard</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
