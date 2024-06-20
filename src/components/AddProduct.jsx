/* The above code is a React component called `AddProduct` that serves as a form for adding a new
product. Here is a summary of what the code does: */
import React, { useState } from "react";
import Upload_area from "../assets/upload.png";
import { PlusOutlined } from "@ant-design/icons";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/api";

const AddProduct = () => {
  const [showUpload, setShowUpload] = useState(true);
  const [showUpload2, setShowUpload2] = useState(true);
  const [showUpload3, setShowUpload3] = useState(true);
  const [productData, setProductData] = useState({
    name: "",
    categoryName: "",
    new_price: "",
    old_price: "",
    description: "",
    sizes: [],
    images: null,
    categoryThumbnail: null,
    categoryBanner: null,
    imageUrls: [], //store temp image urls
    bannerUrl: [],
    thumbnailUrl: [],
    available: true,
  });
  const [showLoader, setShowLoader] = useState(false);

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

  const handleImageChange2 = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setProductData((prevState) => ({
      ...prevState,
      categoryThumbnail: files,
      thumbnailUrl: urls,
    }));
    setShowUpload2(false);
  };

  const handleImageChange3 = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setProductData((prevState) => ({
      ...prevState,
      categoryBanner: files,
      bannerUrl: urls,
    }));
    setShowUpload3(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("categoryName", productData.categoryName);
    formData.append("new_price", productData.new_price);
    formData.append("old_price", productData.old_price);
    formData.append("description", productData.description);
    formData.append("sizes", productData.sizes.join(","));
    formData.append("available", productData.available);
    if (productData.images) {
      Array.from(productData.images).forEach((file, index) => {
        formData.append("images", file);
      });
    }
    if (productData.categoryThumbnail) {
      formData.append("categoryThumbnail", productData.categoryThumbnail[0]);
    }
    if (productData.categoryBanner) {
      formData.append("categoryBanner", productData.categoryBanner[0]);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/api/products/addproduct", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      console.log(data);
      // Handle success or error based on the response
      if (response.status >= 200 && response.status < 300) {
        // Show success message only if the request was successful
        toast.success("🦄 Product Added", {
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
      } else {
        // Optionally, handle other status codes here
        console.error("Unexpected response status:", response.status);
      }

      // Reset form
      setProductData({
        name: "",
        categoryName: "",
        new_price: "",
        old_price: "",
        description: "",
        sizes: [],
        images: null,
        categoryThumbnail: null,
        categoryBanner: null,
        imageUrls: [], //store temp image urls
        bannerUrl: [],
        thumbnailUrl: [],
        available: true,
      });
      setShowUpload(true);
      setShowLoader(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error uploading product. Please try again.", {
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
        PRODUCT ADDING FORM!
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
            className="bg-black/50 outline-none w-full py-3 px-4 rounded-md text-white"
            value={productData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* CATEGORY */}
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Category:</h4>
          <select
            name="categoryName"
            value={productData.categoryName}
            onChange={handleInputChange}
            className="bg-black/50 outline-none w-full py-3 px-4 rounded-md text-white"
          >
            <option value="_">-</option>
            <option value="FASHION">Fashion</option>
            <option value="HOME DECOR">Home Decor</option>
            <option value="ARTS">Arts</option>
            <option value="CUSTOMIZED">Customized</option>
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
              className="form-checkbox cursor-pointer h-5 w-5 text-white mr-2 custom-checkbox"
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
              className="form-checkbox cursor-pointer h-5 w-5 text-white mr-2 custom-checkbox"
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
            className="bg-black/50 outline-none w-full py-3 px-4 rounded-md text-white"
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
            className="bg-black/50 outline-none w-full py-3 px-4 rounded-md text-white"
            value={productData.old_price}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* ROW 3 / DESCRIPTION*/}
      <div className="mb-3 w-full">
        <h4 className="font-anta bold-18 pb-2">Description:</h4>
        <textarea
          id="description"
          placeholder="Type here..."
          name="description"
          className="bg-black/50 outline-none w-full py-3 px-4 rounded-md text-white"
          value={productData.description}
          onChange={handleInputChange}
        />
      </div>

      {/* ROW 4 / SIZES */}
      <div className="mb-3">
        <h4 className="font-anta bold-18 pb-2">Sizes:</h4>
        <div className="grid grid-cols-3 lg:grid-cols-7 gap-4">
          {[
            "18'inch",
            "20'inch",
            "22'inch",
            "24'inch",
            "25'inch",
            "27'inch",
            "29'inch",
          ].map((size) => (
            <div key={size}>
              <input
                type="checkbox"
                id={size}
                className="form-checkbox cursor-pointer h-5 w-5 text-gray-600"
                value={size}
                name="sizes"
                onChange={handleSizeChange}
                checked={productData.sizes.includes(size)}
              />
              <label htmlFor={size} className="ml-2 font-anta text-sm">
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY IMAGES */}
      <div className="flex gap-x-10 justify-evenly">
        {/* THUMBNAIL IMAGE */}
        {showUpload2 ? (
          <div className="mt-10">
            <h4 className="font-anta bold-18 pb-2">
              Add Category Thumbnail Image:
            </h4>
            <label
              htmlFor="thumbnail-input"
              className="flex justify-center items-center max-w-50 w-full flex-col border-2 border-2-white rounded-md bg-black/50 cursor-pointer"
            >
              <img
                src={Upload_area}
                alt="upload"
                className="w-32 rouned-sm inline-block"
              />
              <h4 className="font-anta py-3 text-white">Upload</h4>
            </label>
            <input
              onChange={handleImageChange2}
              type="file"
              id="thumbnail-input"
              name="thumbnailImages"
              multiple
              hidden
              className="bg-black/50 text-white outline-none max-w-80 w-full py-3 px-4 rounded-md"
            />
          </div>
        ) : null}
        {!showUpload2 && productData?.thumbnailUrl?.length > 0 && (
          <div className="mt-10">
            <h4 className="font-anta bold-18 pb-2">
              Selected Thumbnail Image:
            </h4>
            <div className="grid lg:grid-cols-1 gap-x-4">
              {productData.thumbnailUrl.map((url, index) => (
                <div
                  key={index}
                  className="mb-2 flex flex-col justify-center items-center text-center"
                >
                  <img
                    src={url}
                    alt={`Selected ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <button
            onClick={() => setShowUpload2(true)}
            className="btn_dark_rounded mt-5 !rounded gap-x-1 flex justify-center items-center"
          >
            Select New Images
          </button>
                  {/* <p className="text-white text-[10px] mt-2">{productData.images[index]?.name}</p> */}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BANNER IMAGE */}
        {showUpload3 ? (
          <div className="mt-10">
            <h4 className="font-anta bold-18 pb-2">
              Add Category Banner Image:
            </h4>
            <label
              htmlFor="banner-input"
              className="flex justify-center items-center max-w-50 w-full flex-col border-2 border-2-white rounded-md bg-black/50 cursor-pointer"
            >
              <img
                src={Upload_area}
                alt="upload"
                className="w-32 rouned-sm inline-block"
              />
              <h4 className="font-anta py-3 text-white">Upload</h4>
            </label>
            <input
              onChange={handleImageChange3}
              type="file"
              id="banner-input"
              name="bannerImage"
              multiple
              hidden
              className="bg-black/50 text-white outline-none max-w-50 w-full py-3 px-4 rounded-md"
            />
          </div>
        ) : null}
        {!showUpload3 && productData?.bannerUrl?.length > 0 && (
          <div className="mt-10">
            <h4 className="font-anta bold-18 pb-2">Selected Banner Images:</h4>
            <div className="grid lg:grid-cols-1 grid-cols-1 gap-x-4">
              {productData.bannerUrl.map((url, index) => (
                <div
                  key={index}
                  className="mb-2 flex flex-col justify-center items-center text-center"
                >
                  <img
                    src={url}
                    alt={`Selected ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <button
                    onClick={() => setShowUpload3(true)}
                    className="btn_dark_rounded mt-5 !rounded gap-x-1 flex justify-center items-center"
                  >
                    Select New Images
                  </button>
                  {/* <p className="text-white text-[10px] mt-2">{productData.images[index]?.name}</p> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ROW 5 / UPLOAD IMAGES */}
      {showUpload ? (
        <div className="mt-10">
          <h4 className="font-anta bold-18 pb-2">Add Product Images:</h4>
          <label
            htmlFor="product-images-input"
            className="flex justify-center items-center flex-col border-2 border-2-white bg-black/50 rounded-md cursor-pointer"
          >
            <img
              src={Upload_area}
              alt="upload"
              className="w-32 rouned-sm inline-block"
            />
            <h4 className="font-anta py-3 text-white">Upload</h4>
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="product-images-input"
            name="productImage"
            multiple
            hidden
            className="bg-black/50 text-white outline-none max-w-80 w-full py-3 px-4 rounded-md"
          />
        </div>
      ) : null}
      {!showUpload && productData?.imageUrls?.length > 0 && (
        <div className="mt-10">
          <h4 className="font-anta bold-18 pb-2">Selected Images:</h4>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-x-4">
            {productData.imageUrls.map((url, index) => (
              <div
                key={index}
                className="mb-2 flex justify-center items-center text-center"
              >
                <img
                  src={url}
                  alt={`Selected ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-md"
                />
                {/* <p className="text-white text-[10px] mt-2">{productData.images[index]?.name}</p> */}
              </div>
            ))}
          </div>
        </div>
      )}
      {!showUpload ? (
        <button
          onClick={() => setShowUpload(true)}
          className="btn_dark_rounded mt-5 !rounded gap-x-1 flex justify-center items-center"
        >
          Select New Images
        </button>
      ) : null}

      <button
        onClick={handleSubmit}
        className="btn_dark_rounded mt-5 !rounded gap-x-1 flex justify-center items-center"
      >
        <PlusOutlined className="font-anta" />
        Add Product
      </button>

      {showLoader && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
