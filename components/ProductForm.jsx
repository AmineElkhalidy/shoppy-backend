import React, { useState, useEffect } from "react";

// Axios
import axios from "axios";

// Icons
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/solid";

// Next
import { useRouter } from "next/router";

// Toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Spinner
import LoadingSpinner from "./LoadingSpinner";

// Sorting
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  _id,
  title: productTitle,
  category: productCategory,
  description: productDescription,
  price: productPrice,
  images: productImages,
  properties: assignedProperties,
}) => {
  const [title, setTitle] = useState(productTitle || "");
  const [category, setCategory] = useState(productCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [description, setDescription] = useState(productDescription || "");
  const [price, setPrice] = useState(productPrice || "");
  const [images, setImages] = useState(productImages || []);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const router = useRouter();

  const fetchCategories = async () => {
    const response = await axios.get("/api/categories");
    setCategories(response.data);
  };

  const notifyByUpdate = () =>
    toast.success("Product updated successfully!", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyByAdd = () =>
    toast.success("Product added successfully!", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  // Uploading images
  const uploadImages = async (e) => {
    const files = e.target?.files;

    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      setUploading(true);
      const response = await axios.post("/api/upload", data);
      setImages((oldImages) => [...oldImages, ...response.data.links]);
      setUploading(false);
    }
  };

  // Ordering images
  const updateImagesOrder = (images) => {
    setImages(images);
  };

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);

    // Check if the selected item has a parent
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCategory = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCategory.properties);
      catInfo = parentCategory;
    }
  }

  function setProductProp(productName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[productName] = value;
      return newProductProps;
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      title,
      category,
      description,
      price,
      images,
      properties: productProperties,
    };

    if (_id) {
      // Update product
      await axios.put("/api/products", { ...data, _id });
      notifyByUpdate();
    } else {
      await axios.post("/api/products", data);
      // Setting the values to none again
      setTitle("");
      setCategory("");
      setDescription("");
      setPrice("");
      setImages([]);

      notifyByAdd();
      router.push("/products");
    }
  };

  return (
    <form
      action="#"
      className="lg:w-[60%] bg-white max-w-xl mx-auto rounded-md shadow-md"
      onSubmit={submitHandler}
    >
      <div className="p-6 space-y-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="product-name">Product Name</label>
          <input
            id="product-name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="product-category">Product Category</label>
          <select
            id="product-category"
            className="py-[0.82rem] border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose a category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          {/* Properties of the category */}
          {propertiesToFill.length > 0 &&
            propertiesToFill.map((property, index) => (
              <div key={index} className="flex gap-1">
                <div>{property?.name}</div>
                <select
                  value={productProperties[property?.name]}
                  onChange={(e) =>
                    setProductProp(property?.name, e.target.value)
                  }
                >
                  {property?.values.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="product-description">Product Description</label>
          <textarea
            id="product-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="product-description">Product Images</label>
          <div className="flex gap-2">
            <ReactSortable
              className="flex gap-2"
              list={images}
              setList={updateImagesOrder}
            >
              {!!images?.length &&
                images.map((link) => (
                  <div
                    className="relative w-28 h-28 border border-gray-300 rounded-md bg-gray-200 flex justify-center items-center overflow-hidden"
                    key={link}
                  >
                    <img src={link} alt="Product image" />
                    <TrashIcon className="absolute top-1 right-1 w-5 h-5 text-gray-400 duration-300 hover:text-red-500 cursor-pointer" />
                  </div>
                ))}
            </ReactSortable>

            {uploading && (
              <div className="flex justify-center items-center">
                <LoadingSpinner />
              </div>
            )}
            <div className="flex gap-2">
              <label
                htmlFor="product-images"
                className="w-28 h-28 border border-gray-300 rounded-md bg-gray-200 flex flex-col justify-center items-center cursor-pointer text-sm gap-1"
              >
                <ArrowUpTrayIcon className="w-5 h-5" />
                Upload
              </label>
              <input
                id="product-images"
                type="file"
                accept="image/png, image/jpeg"
                style={{ display: "none", visibility: "none" }}
                onChange={uploadImages}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="product-price">Product Price (USD)</label>
          <input
            id="product-price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-10 py-3 bg-mainColor text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
