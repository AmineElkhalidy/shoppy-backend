import React from "react";

// Icons
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

// Link
import Link from "next/link";

const ProductItem = ({
  title,
  price,
  _id,
  images,
  setIsOpen,
  setTargetedProduct,
}) => {
  return (
    <article className="p-4 border border-gray-400 w-[230px] rounded-md">
      <div className="w-full h-40 flex justify-center items-center mb-2 rounded-md overflow-hidden">
        <img className="h-full object-cover" src={images[0]} alt="" />
      </div>

      <div className="">
        <h2 className="text-gray-600">{title}</h2>
        <p className="mb-4">
          <b>${price}</b>
        </p>

        <div className="flex items-center justify-between">
          <Link
            href={"/products/edit/" + _id}
            className="inline-flex items-center gap-1 border border-gray-400 h-8 w-24 justify-center rounded-md text-sm duration-300 hover:bg-cyan-700 hover:text-white"
          >
            <PencilIcon className="w-4 h-4" /> Edit
          </Link>
          <button
            onClick={() => {
              setIsOpen(true);
              setTargetedProduct(_id);
            }}
            className="inline-flex items-center gap-1 text-red-500 border border-gray-400 h-8 w-24 justify-center rounded-md text-sm duration-300 hover:bg-red-600 hover:text-white"
          >
            <TrashIcon className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
