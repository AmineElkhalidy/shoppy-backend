import React, { useEffect, useState } from "react";

// Axios
import axios from "axios";

// Next
import { useRouter } from "next/router";

// Components
import ProductForm from "@/components/ProductForm";

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Edit Product</h2>
      </div>

      {productInfo && <ProductForm {...productInfo} />}
    </div>
  );
};

export default EditProduct;
