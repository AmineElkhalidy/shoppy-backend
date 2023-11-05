import { signIn, signOut, useSession } from "next-auth/react";
import Login from "./login";

export default function Home() {
  // rename data to session
  const { data: session } = useSession();

  return (
    <>
      <Login />
      <div className="p-4">
        <div className="flex items-center">
          <div>
            <h1 className="text-4xl font-semibold">
              Welcome Back,{" "}
              <span className="text-orange-500">{session?.user?.name}</span>
            </h1>

            <h2 className="text-3xl font-medium mt-4">Dashboard</h2>
          </div>
        </div>
      </div>
    </>
  );
}
