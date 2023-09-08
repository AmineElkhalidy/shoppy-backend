import React, { useState, useEffect } from "react";

// Axios
import axios from "axios";

// Next
import Link from "next/link";

// Toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// React Modal
import Modal from "react-modal";

// Components
import LoadingSpinner from "@/components/LoadingSpinner";

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

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null);
  const [targetedCategory, setTargetedCategory] = useState("");
  const [properties, setProperties] = useState([]);

  // Model state
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
      setLoading(false);
    });
  };

  const notify = () =>
    toast.success("Category added successfully!", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyByEdit = () =>
    toast.success("Category edited successfully!", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyByDeletion = () =>
    toast.success("Category successfully deleted!", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      name: categoryName,
      parentCategory,
      properties: properties.map((property) => ({
        name: property.name,
        values: property.values.split(","),
      })),
    };

    if (editedCategory) {
      data._id = editedCategory._id;
      axios.put("/api/categories", data);
      setEditedCategory(null);
      notifyByEdit();
    } else {
      await axios.post("/api/categories", data);
      notify();
    }

    setCategoryName("");
    setParentCategory("");
    setProperties([]);

    fetchCategories();
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setCategoryName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  };

  const deleteCategory = async (id) => {
    await axios.delete("/api/categories?id=" + id);
    notifyByDeletion();
    setIsOpen(false);

    fetchCategories();
  };

  const addProperty = () => {
    setProperties((prev) => {
      return [
        ...prev,
        {
          name: "",
          values: "",
        },
      ];
    });
  };

  const removeProperty = (index) => {
    setProperties((prev) => {
      const newProperties = [...prev];
      return newProperties.filter((p, pIndex) => pIndex !== index);
    });
  };

  const handlePropertyNameChange = (index, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };

  const handlePropertyaluesChange = (index, property, newValues) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  };

  return (
    <>
      <div className="p-4">
        <form
          action="#"
          className="w-full bg-white rounded-md shadow-md mb-6"
          onSubmit={submitHandler}
        >
          <div className="px-6 pt-6 flex gap-2 mb-4">
            <div className="flex flex-col grow">
              <label htmlFor="product-name">
                {editedCategory
                  ? `Edit Category '${editedCategory.name}'`
                  : "Category Name"}
              </label>
              <input
                id="product-name"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>

            <div className="pt-6 w-[25%]">
              <select
                className="w-full py-[0.7rem] px-2 rounded-md"
                onChange={(e) => setParentCategory(e.target.value)}
                value={parentCategory}
              >
                <option value="0">No parent category</option>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Property Block */}
          <div className="flex justify-between items-center px-6 mb-2">
            <label htmlFor="product-properties mb-2">Properties</label>
            <div className="">
              <button
                type="button"
                onClick={addProperty}
                className="px-10 py-[0.55rem] bg-mainColor text-white rounded-lg"
              >
                + Add new
              </button>
            </div>
          </div>

          {/* Properties Inputs */}
          <div className="px-6 mb-6">
            {properties.length > 0 &&
              properties.map((property, i) => (
                <div key={i} className="w-full flex gap-2 mt-3">
                  <input
                    className="w-full"
                    type="text"
                    placeholder="property name (ex.color)"
                    value={property.name}
                    onChange={(e) =>
                      handlePropertyNameChange(i, property, e.target.value)
                    }
                  />
                  <input
                    className="w-full"
                    type="text"
                    placeholder="comma separated values"
                    value={property.values}
                    onChange={(e) =>
                      handlePropertyaluesChange(i, property, e.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => removeProperty(i)}
                    className="px-8 py-[0.55rem] bg-red-500 text-white rounded-lg duration-300 hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>

          <div className="px-6 pb-6 text-right">
            {editedCategory && (
              <button
                type="button"
                onClick={() => {
                  setParentCategory("");
                  setCategoryName("");
                  setEditedCategory(null);
                  setProperties([]);
                }}
                className="px-12 py-[0.55rem] bg-yellowColor text-white rounded-lg mr-2 duration-300 hover:bg-yellow-500"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-12 py-[0.55rem] bg-mainColor text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>

        <div className="p-4 bg-white w-full rounded-md">
          <h2 className="text-2xl text-center font-semibold mb-6">
            Categories List
          </h2>

          {loading ? (
            <div className="w-full flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-md">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Category Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Parent Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      N° Of Products
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 && !loading && (
                    <td className="px-2 py-4 text-mainColor">
                      No categories to show, start adding some!
                    </td>
                  )}
                  {categories.map((category) => (
                    <tr
                      key={category._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {category.name}
                      </th>
                      <td className="px-6 py-4 text-yellowColor">
                        {category?.parent?.name}
                      </td>
                      <td className="px-6 py-4 ">UNKNOWN</td>

                      <td className="px-6 py-4 text-right space-x-6">
                        <button
                          onClick={() => editCategory(category)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setTargetedCategory(category._id);
                            setIsOpen(true);
                          }}
                          className="font-medium text-red-500 dark:text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
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
                  Do you really want to delete this category ?
                </h2>

                <div className="flex justify-center items-center gap-6">
                  <button
                    onClick={() => deleteCategory(targetedCategory)}
                    className="bg-red-500 text-white h-8 w-24 rounded-md"
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

export default Categories;
