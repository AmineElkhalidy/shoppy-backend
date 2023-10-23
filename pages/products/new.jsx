import React, { useState } from "react";

// Axios
import axios from "axios";

// Next
import { useRouter } from "next/router";

// Components
import ProductForm from "@/components/ProductForm";

const NewProduct = () => {
  return (
    <div className="py-10">
      <div className="mb-6">
        <h2 className="text-3xl text-center font-semibold">Add Product</h2>
      </div>

      <ProductForm />
    </div>
  );
};

export default NewProduct;
