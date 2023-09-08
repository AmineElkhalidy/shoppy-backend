import React from "react";

// Next Components
import Link from "next/link";

const Customers = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Customers</h2>
        <Link
          className="px-6 py-3 bg-mainColor text-white rounded-lg"
          href="/products/new"
        >
          + Add new
        </Link>
      </div>
    </div>
  );
};

export default Customers;
