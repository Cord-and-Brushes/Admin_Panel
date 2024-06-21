import React, { useState, useEffect } from "react";
import Upload_area from "../assets/upload.png";
import { PlusOutlined } from "@ant-design/icons";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, updateProduct } from "../features/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    categoryId: "",
    new_price: "",
    old_price: "",
    description: "",
    sizes: [],
    images: null,
    imageUrls: [], 
    available: true,
  });

  const dispatch = useDispatch();
  const product = useSelector(state => state.products.product);
  console.log("Product: ", product);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        await dispatch(fetchProductById({ id: id }));
        // const fetchedProduct = useSelector(state => state.products.product);
        // console.log("fetchedProduct: ", fetchedProduct);

        setProductData({
          name: product.name,
          categoryId: product.category,
          new_price: product.new_price,
          old_price: product.old_price,
          description: product.description,
          sizes: product.sizes,
          images: null, 
          imageUrls: product.images, 
          available: product.available,
        });

        // setInitialImages(product.images);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/categories/allcategories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setProductData((prevState) => ({
        ...prevState,
        [name]: e.target.checked,
        available: name === "available" ? true : false,
      }));
    } else {
      setProductData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSizeChange = (e) => {
    const { checked, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      sizes: checked
        ? [...prevState.sizes, value]
        : prevState.sizes.filter((size) => size !== value),
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setProductData((prevState) => ({
      ...prevState,
      images: files,
      imageUrls: urls,
    }));
    setShowUpload(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("categoryId", productData.categoryId);
    formData.append("new_price", productData.new_price);
    formData.append("old_price", productData.old_price);
    formData.append("description", productData.description);
    formData.append("sizes", productData.sizes.join(","));
    formData.append("available", productData.available);
   
    if (productData.images && productData.images.length > 0) {
       Array.from(productData.images).forEach((file, index) => {
         formData.append("images", file);
       });
    }
   
    try {
       dispatch(updateProduct({id:id, productData:formData}));
         toast.success("🦄 Product Updated", {
           position: "bottom-right",
           autoClose: 3000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "dark",
           transition: Zoom,
         });
         // Navigate back to the product list after successful update
         window.location.href = "/admin/productlist"; // Use window.location.href to navigate
       
   
       // Reset form
       setProductData({
         name: "",
         categoryId: "",
         new_price: "",
         old_price: "",
         description: "",
         sizes: [],
         images: null,
         imageUrls: [], //store temp image urls
         available: true,
       });
       setShowUpload(true);
       setShowLoader(false);
    } catch (error) {
       console.error("Error:", error);
       toast.error("Error updating product. Please try again.", {
         position: "bottom-right",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "dark",
         transition: Zoom,
       });
       setShowLoader(false);
    }
   };

  return (
    <div className="text-white font-anta p-8 box-border bg-black/15 w-full rounded-sm mt-4 lg:m-7">
      <h1 className="bold-22 font-anta text-center mb-5">
        PRODUCT EDITING FORM!
      </h1>

      {/* ROW 1 / NAME & CATEGORY*/}
      <div className="flex flex-col lg:flex-row gap-x-10">
        {/* NAME */}
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Product Title:</h4>
          <input
            type="text"
            name="name"
            placeholder="Type here..."
            className="bg-primary outline-none w-full py-3 px-4 rounded-md text-black"
            value={productData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* CATEGORY */}
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Category:</h4>
          <select
            name="categoryId"
            value={productData.categoryId}
            onChange={handleInputChange}
            className="bg-primary outline-none w-full py-3 px-4 rounded-md text-black"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* AVAILABILITY */}
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Availability:</h4>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={productData.available}
              onChange={handleInputChange}
              className="form-checkbox cursor-pointer h-5 w-5 text-gray-600 mr-2"
            />
            <label htmlFor="available" className="font-anta text-sm">
              Available
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="unavailable"
              name="unavailable"
              checked={!productData.available}
              onChange={handleInputChange}
              className="form-checkbox cursor-pointer h-5 w-5 text-gray-600 mr-2"
            />
            <label htmlFor="unavailable" className="font-anta text-sm">
              Unavailable
            </label>
          </div>
        </div>
      </div>

      {/* ROW 2 / PRICES */}
      <div className="flex flex-col lg:flex-row  gap-x-10">
        {/* NEW PRICE */}
        <div className="mb-3 max-w-[700px] w-full">
          <h4 className="font-anta bold-18 pb-2">New Price:</h4>
          <input
            type="number"
            name="new_price"
            placeholder="Type here..."
            className="bg-primary outline-none w-full py-3 px-4 rounded-md text-black"
            value={productData.new_price}
            onChange={handleInputChange}
          />
        </div>

        {/* OLD PRICE */}
        <div className="mb-3 max-w-[700px] w-full">
          <h4 className="font-anta bold-18 pb-2">Old Price:</h4>
          <input
            type="number"
            name="old_price"
            placeholder="Type here..."
            className="bg-primary outline-none w-full py-3 px-4 rounded-md text-black"
            value={productData.old_price}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* ROW 3 / DESCRIPTION */}
      <div className="mb-3 w-full">
        <h4 className="font-anta bold-18 pb-2">Description:</h4>
        <textarea
          name="description"
          placeholder="Type here..."
          className="bg-primary outline-none w-full py-3 px-4 rounded-md text-black"
          rows="5"
          value={productData.description}
          onChange={handleInputChange}
        />
      </div>

      {/* ROW 4 / SIZES */}
      <div className="mb-3 max-w-[700px] w-full">
        <h4 className="font-anta bold-18 pb-2">Sizes:</h4>
        <div className="flex gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="xs"
              name="XS"
              value="XS"
              checked={productData.sizes.includes("XS")}
              onChange={handleSizeChange}
              className="form-checkbox cursor-pointer h-5 w-5 text-gray-600 mr-2"
            />
            <label htmlFor="xs" className="font-anta text-sm">
              XS
            </label>
          </div>
          {/* Add more size options similarly */}
        </div>
      </div>

      {/* ROW 5 / IMAGES */}
      <div className="mb-3 max-w-[700px] w-full">
        <h4 className="font-anta bold-18 pb-2">Images:</h4>
        <div className="flex gap-4 items-center">
          {productData.imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Product ${index + 1}`}
              className="h-20 w-20 object-cover rounded-md"
            />
          ))}
          {showUpload && (
            <label className="cursor-pointer">
              <img
                src={Upload_area}
                alt="Upload Area"
                className="h-20 w-20 object-cover rounded-md border border-dotted border-gray-500"
              />
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
          {!showUpload && (
            <div
              onClick={() => setShowUpload(true)}
              className="h-20 w-20 flex items-center justify-center rounded-md border border-dotted border-gray-500 cursor-pointer"
            >
              <PlusOutlined className="text-4xl text-gray-500" />
            </div>
          )}
        </div>
      </div>

      {/* ROW 6 / BUTTONS */}
      <div className="flex justify-between">
        <button
          className="bg-white font-anta bold-20 px-8 py-3 text-black rounded-sm cursor-pointer"
          onClick={handleSubmit}
          disabled={showLoader}
        >
          {showLoader ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default EditProduct;

