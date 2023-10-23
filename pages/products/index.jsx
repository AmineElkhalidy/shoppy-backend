import React, { useEffect, useState } from "react";

// Axois
import axios from "axios";

// React Modal
import Modal from "react-modal";

// Toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Next Components
import Link from "next/link";

// Components
import LoadingSpinner from "@/components/LoadingSpinner";
import ProductItem from "@/components/ProductItem";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "6px",
  },
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [targetedProduct, setTargetedProduct] = useState("");

  // Model state
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    await axios.get("/api/products").then((response) => {
      setProducts(response.data);
      setLoading(false);
    });
  };

  const deleteProduct = async (id) => {
    await axios.delete("/api/products?id=" + id);
    notify();
    setIsOpen(false);

    fetchProducts();
  };

  const notify = () =>
    toast.success("Product successfully deleted!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Products Grid</h2>
          <Link
            className="px-6 py-3 bg-mainColor text-white rounded-lg"
            href="/products/new"
          >
            + Add new
          </Link>
        </div>

        <div className="p-4 bg-white w-full flex flex-wrap justify-center gap-2 rounded-md">
          {products.length === 0 && !loading && (
            <p>No products to show, start adding some!</p>
          )}
          {loading ? (
            <LoadingSpinner />
          ) : (
            products.map((product) => (
              <ProductItem
                key={product._id}
                {...product}
                setIsOpen={setIsOpen}
                setTargetedProduct={setTargetedProduct}
              />
            ))
          )}
        </div>
      </div>

      {modalIsOpen && (
        <div className="shadow-md">
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            contentLabel="Delete Modal"
            ariaHideApp={false}
          >
            <div className="w-[450px] relative">
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-lg text-mainColor mb-4">
                  Do you really want to delete this product ?
                </h2>

                <div className="flex justify-center items-center gap-6">
                  <button
                    onClick={() => deleteProduct(targetedProduct)}
                    className="bg-red-500 text-white h-8 w-24 rounded-md duration-300 hover:bg-red-600"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-mainColor text-white h-8 w-24 rounded-md"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Products;
