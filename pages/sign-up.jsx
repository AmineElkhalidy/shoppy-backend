import React from "react";
import {
  ShoppingBagIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const SignUp = () => {
  const [show, setShow] = React.useState(false);
  return (
    <div className="bg-mainColor min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block ">
        <div className="h-full flex flex-col justify-center items-center">
          <div className="text-white flex items-center gap-5">
            <ShoppingBagIcon className="w-20 h-20" />
            <h2 className="text-7xl font-semibold">Shoppy</h2>
          </div>
          <p className="text-gray-300 text-2xl mt-4">
            Your best <span className="text-orange-600">shopping partner</span>
          </p>
        </div>
      </div>

      <div className="w-full bg-white p-10">
        <h1 className="text-4xl text-orange-600">Shoppy</h1>
        <h2 className="text-3xl font-semibold">Create Account</h2>
        <p className="my-5 text-lg font-light">Glad to have you onboard</p>
        <form>
          <div>
            <input
              type="text"
              className=" w-full py-4"
              placeholder="Your Full Name"
            />
          </div>

          <div>
            <input
              type="text"
              className="mt-3 w-full py-4"
              placeholder="Your Email"
            />
          </div>

          <div className="my-3 flex items-center border py-2 rounded-md border-black border-opacity-40 pr-2">
            <input
              type={!show ? "text" : "password"}
              className="w-full bg-none border-none outline-none h-full"
              placeholder="Your Password"
            />

            {!show ? (
              <EyeSlashIcon
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShow(true)}
              />
            ) : (
              <EyeIcon
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShow(false)}
              />
            )}
          </div>

          <div className="my-3 flex items-center border py-2 rounded-md border-black border-opacity-40 pr-2">
            <input
              type={!show ? "text" : "password"}
              className="w-full bg-none border-none outline-none h-full"
              placeholder="Confirm Your Password"
            />

            {!show ? (
              <EyeSlashIcon
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShow(true)}
              />
            ) : (
              <EyeIcon
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShow(false)}
              />
            )}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <input type="checkbox" />
              <label className="ml-1 accent-orange-600">
                I accept the{" "}
                <Link
                  href="#"
                  className="underline decoration-blue-600 text-blue-600"
                >
                  terms & conditions
                </Link>
              </label>
            </div>
          </div>

          <div className="mt-10">
            <button className="w-full py-4 bg-orange-600 rounded-md text-white  text-lg font-semibold duration-300 hover:bg-orange-700">
              Sign Up
            </button>
          </div>
          <p className="text-center mt-4">
            Already have an account{" "}
            <Link
              href="/"
              className="text-orange-600 font-semibold underline decoration-orange-600"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
