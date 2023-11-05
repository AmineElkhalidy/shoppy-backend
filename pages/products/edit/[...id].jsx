import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ProductForm from "@/components/ProductForm";
import Header from "@/components/Header";
import SidebarNavigation from "@/components/SidebarNavigation";
import { useSession } from "next-auth/react";

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState(null);
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  return (
    <div className="relative w-full bg-gray-200 min-h-screen flex">
      <SidebarNavigation setIsCollapsed={setIsCollapsed} />

      <div className={`grow ${isCollapsed ? "pl-[5rem]" : "pl-[15.5rem]"}`}>
        <Header session={session} />
        <>
          <div className="p-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold">Edit Product</h2>
            </div>

            {productInfo && <ProductForm {...productInfo} />}
          </div>
        </>
      </div>
    </div>
  );
};

export default EditProduct;
