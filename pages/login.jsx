import React from "react";
import {
  ShoppingBagIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const Login = ({ isDemoMode }) => {
  const [show, setShow] = React.useState(false);
  const [demo, setDemo] = React.useState(false);

  isDemoMode(demo);

  return (
    <div className="bg-mainColor min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block">
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
        <h1 className="text-3xl font-semibold">
          Welcome Back <br />
          <span className="text-4xl text-orange-600">Shoppy Friend</span>
        </h1>
        <p className="my-5 text-lg font-light">
          Good to see you again!
          <br /> Please login to your account
        </p>
        <form className="">
          <div>
            <input
              type="text"
              className="w-full py-4"
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

          <div className="flex justify-between items-center">
            <div>
              <input type="checkbox" />
              <label className="ml-1 accent-orange-600">Remember Me</label>
            </div>

            <Link
              href={"#"}
              className="text-orange-600 underline decoration-orange-600"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="mt-10 space-y-3">
            <button className="w-full py-4 bg-orange-600 rounded-md text-white  text-lg font-semibold duration-300 hover:bg-orange-700">
              Login
            </button>
            <button
              onClick={() => setDemo(true)}
              className="w-full py-4 bg-mainColor rounded-md text-white text-lg font-semibold"
            >
              Demo
            </button>
          </div>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-orange-600 font-semibold underline decoration-orange-600"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
