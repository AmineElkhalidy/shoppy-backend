import React, { useState } from "react";

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
  ChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
  ForwardIcon,
  GlobeAltIcon,
  PencilIcon,
  TagIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";

// Sidebar
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";

// Next Components
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  {
    linkHref: "/",
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
    linkHref: "/customers",
    linkTitle: "Customers",
    LinkIcon: <UsersIcon className="w-6 h-6 text-gray-400" />,
  },
  {
    linkHref: "/statistics",
    linkTitle: "Statistics",
    LinkIcon: <ChartBarIcon className="w-6 h-6 text-gray-400" />,
  },
  {
    linkHref: "/reviews",
    linkTitle: "Reviews",
    LinkIcon: <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-gray-400" />,
  },
  {
    linkHref: "/transactions",
    linkTitle: "Transactions",
    LinkIcon: <ForwardIcon className="w-6 h-6 text-gray-400" />,
  },
  {
    linkHref: "/sellers",
    linkTitle: "Sellers",
    LinkIcon: <GlobeAltIcon className="w-6 h-6 text-gray-400" />,
  },
  {
    linkHref: "/hot-offers",
    linkTitle: "Hot Offers",
    LinkIcon: <TagIcon className="w-6 h-6 text-gray-400" />,
  },
  {
    linkHref: "/appearance",
    linkTitle: "Appearance",
    LinkIcon: <PencilIcon className="w-6 h-6 text-gray-400" />,
  },
  {
    linkHref: "/settigns",
    linkTitle: "Settigns",
    LinkIcon: <Cog6ToothIcon className="w-6 h-6 text-gray-400" />,
  },
];

// MenuItems components
const Item = ({ linkTitle, href, icon, selected, setSelected }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <MenuItem
      active={selected === linkTitle}
      onClick={() => setSelected(linkTitle)}
      icon={icon}
      component={
        <Link
          href={href}
          className={currentRoute === href ? "bg-accentColor" : ""}
        ></Link>
      }
      className=""
    >
      <p className="text-gray-200">{linkTitle}</p>
    </MenuItem>
  );
};

const SidebarNavigation = ({ className, setIsCollapsed }) => {
  // States
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();
  const [selected, setSelected] = useState("Dashboard");

  return (
    <aside className={`min-h-screen ${className}`}>
      <Sidebar backgroundColor="#131921" className="h-full">
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
                <ShoppingBagIcon className="w-8 h-8" /> Shoppy
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
