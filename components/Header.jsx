import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

// Icons
import {
  BellAlertIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/outline";

const Header = ({ session }) => {
  const [showDropmenu, setShowDropmenu] = useState(false);
  return (
    <header className="flex justify-between items-center h-[4.1rem] bg-mainColor px-4">
      {/* Search */}
      <form className="w-[30%] flex items-center">
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            placeholder="Search..."
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </form>

      {/* User + Notifications */}
      <div className="flex gap-4">
        <div className="p-2 rounded-full cursor-pointer flex items-center">
          <BellAlertIcon className="w-6 h-6 text-gray-400" />
        </div>

        <div className="relative">
          <div
            className="p-2 cursor-pointer flex justify-center items-center gap-2 text-gray-400 bg-gray-800 rounded-md"
            onClick={() => setShowDropmenu(!showDropmenu)}
          >
            <img
              className="w-7 h-7 rounded-full"
              src={session ? session.user.image : ""}
              alt=""
            />{" "}
            {session ? session.user?.name : "John Doe"}
            {/* {showDropmenu ? (
              <ChevronUpIcon className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            )} */}
          </div>

          {/* {showDropmenu && (
            <ul className="absolute top-12 left-0 w-full bg-white p-4 rounded-md z-50 space-y-2">
              <li>
                <Link
                  className="inline-flex items-center gap-2"
                  href="/profile"
                  onClick={() => setShowDropmenu(false)}
                >
                  <UserIcon className="w-5 h-5" /> My Profile
                </Link>
              </li>

              <li>
                <button
                  className="inline-flex items-center gap-2"
                  onClick={() => signOut()}
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" /> Sign out
                </button>
              </li>
            </ul>
          )} */}
        </div>
      </div>
    </header>
  );
};

export default Header;
