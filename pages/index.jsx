// Authentication functionalities
import { signIn, signOut, useSession } from "next-auth/react";

// Next Components
import { Link } from "next/link";

export default function Home() {
  // rename data to session
  const { data: session } = useSession();

  return (
    <div className="p-4">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </div>
    </div>
  );
}
