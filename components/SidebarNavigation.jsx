import React, { useState } from "react";
import { signOut } from "next-auth/react";

// Icon
import {
  ShoppingBagIcon,
  HomeIcon,
  Cog6ToothIcon,
  ArchiveBoxIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
  UsersIcon,
  UserIcon,
  QueueListIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

// Sidebar
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";

// Next Components
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  {
    linkHref: "/dashboard",
    linkTitle: "Dashboard",
    LinkIcon: <HomeIcon className="w-6 h-6 text-gray-400" />,
  },
  {
    linkHref: "/products",
    linkTitle: "Products",
    LinkIcon: <ArchiveBoxIcon className="w-6 h-6 text-gray-400" />,
  },
  {
    linkHref: "/categories",
    linkTitle: "Categories",
    LinkIcon: <QueueListIcon className="w-6 h-6 text-gray-400" />,
  },
  {
    linkHref: "/orders",
    linkTitle: "Orders",
    LinkIcon: <ShoppingCartIcon className="w-6 h-6 text-gray-400" />,
  },
  {
    linkHref: "/admins",
    linkTitle: "Admins",
    LinkIcon: <UsersIcon className="w-6 h-6 text-gray-400" />,
  },
  {
    linkHref: "/profile",
    linkTitle: "Profile",
    LinkIcon: <UserIcon className="w-6 h-6 text-gray-400" />,
  },
  {
    linkHref: "/settigns",
    linkTitle: "Settigns",
    LinkIcon: <Cog6ToothIcon className="w-6 h-6 text-gray-400" />,
  },
  {
    linkHref: "/",
    linkTitle: "Logout",
    LinkIcon: <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-400" />,
    button: true,
  },
];

// MenuItems components
const Item = ({ linkTitle, href, icon, button, selected, setSelected }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <MenuItem
      active={selected === linkTitle}
      onClick={() => setSelected(linkTitle)}
      icon={icon}
      component={
        button ? (
          <div
            onClick={() => {
              signOut();
              router.replace("/");
            }}
          >
            <button
              className={` ${currentRoute === href ? "bg-accentColor" : ""}`}
            ></button>
          </div>
        ) : (
          <Link
            href={href}
            className={currentRoute === href ? "bg-accentColor" : ""}
          ></Link>
        )
      }
    >
      <p className="text-gray-200">{linkTitle}</p>
    </MenuItem>
  );
};

const SidebarNavigation = ({ className, setIsCollapsed }) => {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();
  const [selected, setSelected] = useState("Dashboard");

  return (
    <aside className="h-screen fixed top-0 left-0 z-50">
      <Sidebar backgroundColor="#131921" className="min-h-screen h-full">
        {/* Logo & Toggler */}
        <div
          className="p-4 border-b border-[#3B4149] mb-6"
          onClick={() => {
            setIsCollapsed(true);
            collapseSidebar();
          }}
        >
          {!collapsed && (
            <div className="w-full flex items-center justify-between ">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-xl text-white"
                onClick={() => collapseSidebar(!collapsed)}
              >
                <ShoppingBagIcon className="w-8 h-8" />{" "}
                <span className="inline-block pt-1">Shoppy</span>
              </Link>

              <button>
                <ChevronLeftIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          )}

          {collapsed && (
            <div className="w-full flex items-center justify-center py-1">
              <ChevronRightIcon className="w-5 h-5 cursor-pointer text-white" />
            </div>
          )}
        </div>

        <Menu>
          {links.map((menuItem, index) => (
            <Item
              key={index}
              linkTitle={menuItem.linkTitle}
              href={menuItem.linkHref}
              icon={menuItem.LinkIcon}
              button={menuItem.button}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </Menu>
      </Sidebar>
    </aside>
  );
};

export default SidebarNavigation;
