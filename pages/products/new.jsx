import React, { useState } from "react";

// Axios
import axios from "axios";

// Next
import { useRouter } from "next/router";

// Components
import ProductForm from "@/components/ProductForm";

const NewProduct = () => {
  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Add Product</h2>
      </div>

      <ProductForm />
    </div>
  );
};

export default NewProduct;
