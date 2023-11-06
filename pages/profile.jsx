import React from "react";
import Header from "@/components/Header";
import SidebarNavigation from "@/components/SidebarNavigation";
import { useSession } from "next-auth/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Profile = () => {
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="relative w-full bg-gray-200 min-h-screen flex">
      <SidebarNavigation setIsCollapsed={setIsCollapsed} />

      <div className={`grow ${isCollapsed ? "pl-[5rem]" : "pl-[15.5rem]"}`}>
        <Header session={session} />
        <div className="p-4">
          <div>
            <div>
              <h2 className="text-3xl font-medium mt-4">My Profile</h2>
              <h3 className="text-2xl">
                Welcome on Board,{" "}
                <span className="text-orange-500 font-medium">
                  {session ? session?.user?.name : "John Doe"}
                </span>
              </h3>
            </div>

            <div className="mt-10">
              <div className="flex flex-col gap-2">
                {session ? (
                  <img
                    className="w-20 h-20 rounded-full"
                    src={session ? session.user.image : ""}
                    alt=""
                  />
                ) : (
                  <UserCircleIcon className="w-16 h-16" />
                )}

                <div className="">
                  <p className="text-lg font-medium">
                    {session & session ? session.user?.name : "John Doe"}
                  </p>
                  <p className="text-lg">
                    {session ? session.user?.email : "johndoe@gmail.com"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
