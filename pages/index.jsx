import { useSession } from "next-auth/react";
import { useState } from "react";
import Login from "./login";
import Header from "@/components/Header";
import SidebarNavigation from "@/components/SidebarNavigation";
import Dashboard from "./dashboard";

export default function Home() {
  // rename data to session
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  const isDemoModeHandler = (arg) => {
    setDemoMode(arg);
  };

  return (
    <>{!demoMode ? <Login isDemoMode={isDemoModeHandler} /> : <Dashboard />}</>
  );
}
