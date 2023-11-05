import React, { useState } from "react";
import Header from "@/components/Header";
import SidebarNavigation from "@/components/SidebarNavigation";
import { useSession } from "next-auth/react";
import ProductForm from "@/components/ProductForm";

const NewProduct = () => {
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative w-full bg-gray-200 min-h-screen flex">
      <SidebarNavigation setIsCollapsed={setIsCollapsed} />

      <div className={`grow ${isCollapsed ? "pl-[5rem]" : "pl-[15.5rem]"}`}>
        <Header session={session} />
        <>
          <div className="py-10">
            <div className="mb-6">
              <h2 className="text-3xl text-center font-semibold">
                Add Product
              </h2>
            </div>

            <ProductForm />
          </div>
        </>
      </div>
    </div>
  );
};

export default NewProduct;
