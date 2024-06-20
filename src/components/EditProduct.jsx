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
  const [showUpload2, setShowUpload2] = useState(false);
  const [showUpload3, setShowUpload3] = useState(false);
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
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.product)
  console.log(product);
  
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        dispatch(fetchProductById({id:id}));
        setProductData({
          name: product.name,
          categoryName: product.category_name,
          new_price: product.new_price,
          old_price: product.old_price,
          description: product.description,
          sizes: product.sizes,
          images: null, // This will be updated when images are selected
          imageUrls: product.images, // Assuming images are URLs
          categoryThumbnail:null,
          categoryBanner: null,
          bannerUrl: product.category_banner,
          thumbnailUrl: product.category_thumbnail,
          available: product.available,
        });
        
        setInitialImages(product.images);
        setInitialThumbnailImage(product.category_thumbnail);
        setInitialBannerImage(product.category_banner);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]); // Depend on the product ID to refetch if it changes
 
  // console.log("productdata", productData);


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
   
    // Append images, categoryBanner, and categoryThumbnail to formData if they exist
    if (productData.images && productData.images.length > 0) {
       Array.from(productData.images).forEach((file, index) => {
         formData.append("images", file);
       });
    }
   
    if (productData.categoryBanner && productData.categoryBanner.length > 0) {
       formData.append("categoryBanner", productData.categoryBanner[0]);
    }
   
    if (productData.categoryThumbnail && productData.categoryThumbnail.length > 0) {
       formData.append("categoryThumbnail", productData.categoryThumbnail[0]);
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
       setShowUpload2(true);
       setShowUpload3(true);
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
            name="categoryName"
            value={productData.categoryName}
            onChange={handleInputChange}
            className="bg-primary outline-none w-full py-3 px-4 rounded-md text-black"
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

      {/* ROW 3 / DESCRIPTION*/}
      <div className="mb-3 w-full">
        <h4 className="font-anta bold-18 pb-2">Description:</h4>
        <textarea
          id="description"
          placeholder="Type here..."
          name="description"
          className="bg-primary outline-none w-full py-3 px-4 rounded-md text-black"
          value={productData.description}
          onChange={handleInputChange}
        />
      </div>

      {/* ROW 4 / SIZES */}
      <div className="mb-3">
        <h4 className="font-anta bold-18 pb-2">Sizes:</h4>
        <div className="grid grid-cols-3 lg:grid-cols-7 gap-4">
          {["18'inch",
            "20'inch",
            "22'inch",
            "24'inch",
            "25'inch",
            "27'inch",
            "29'inch",].map(
            (size) => (
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
            )
          )}
        </div>
      </div>

      {/* CATEGORY IMAGES */}
      <div className="flex gap-x-10 justify-evenly">
        <div>
          {/* THUMBNAIL IMAGES */}
          {showUpload2 ? (
            <div className="mt-10">
              <h4 className="font-anta bold-18 pb-2">Add Category Thumbnail Image:</h4>
              <label
                htmlFor="file-input"
                className="flex justify-center items-center flex-col border-2 border-2-white cursor-pointer"
              >
                <img
                  src={Upload_area}
                  alt="upload"
                  className="w-32 rouned-sm inline-block"
                />
                <h4 className="font-anta">Upload</h4>
              </label>
              <input
                onChange={handleImageChange2}
                type="file"
                id="file-input"
                name="thumbnailImages"
                multiple
                hidden
                className="bg-primary text-black outline-none max-w-80 w-full py-3 px-4 rounded-md"
              />
            </div>
          ) : (
            <div className="mt-10">
              <h4 className="font-anta bold-18 pb-2">Current Images:</h4>
              <div className="flex justify-center items-center gap-x-4">
                <div className="mb-2 flex flex-col justify-center items-center text-center">
                  <img
                    src={productData?.thumbnailUrl}
                    alt="thumbnail"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  {/* <p className="text-white text-[10px] mt-2">{productData.images[index]?.name}</p> */}
                </div>
              </div>
            </div>
          )}
          {!showUpload2 ? (
            <button
              onClick={() => setShowUpload2(true)}
              className="btn_dark_rounded mt-5 !rounded gap-x-1 flex justify-center items-center"
            >
              Select New Images
            </button>
          ) : null}
        </div>

        <div>
          {/* BANNER IMAGES */}
          {showUpload3 ? (
            <div className="mt-10">
              <h4 className="font-anta bold-18 pb-2">Add Category Banner Images:</h4>
              <label
                htmlFor="file-input"
                className="flex justify-center items-center flex-col border-2 border-2-white cursor-pointer"
              >
                <img
                  src={Upload_area}
                  alt="upload"
                  className="w-32 rouned-sm inline-block"
                />
                <h4 className="font-anta">Upload</h4>
              </label>
              <input
                onChange={handleImageChange3}
                type="file"
                id="file-input"
                name="bannerImage"
                multiple
                hidden
                className="bg-primary text-black outline-none max-w-80 w-full py-3 px-4 rounded-md"
              />
            </div>
          ) : (
            <div className="mt-10">
              <h4 className="font-anta bold-18 pb-2">Current Images:</h4>
              <div className="flex justify-center items-center gap-x-4">
                <div className="mb-2 flex flex-col justify-center items-center text-center">
                  <img
                    src={productData?.bannerUrl}
                    alt="banner"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  {/* <p className="text-white text-[10px] mt-2">{productData.images[index]?.name}</p> */}
                </div>
              </div>
            </div>
          )}
          {!showUpload3 ? (
            <button
              onClick={() => setShowUpload3(true)}
              className="btn_dark_rounded mt-5 !rounded gap-x-1 flex justify-center items-center"
            >
              Select New Images
            </button>
          ) : null}
        </div>
      </div>

      {/* ROW 5 / UPLOAD IMAGES */}
      {showUpload ? (
        <div className="mt-10">
          <h4 className="font-anta bold-18 pb-2">Add Product Images:</h4>
          <label
            htmlFor="file-input"
            className="flex justify-center items-center flex-col border-2 border-2-white cursor-pointer"
          >
            <img
              src={Upload_area}
              alt="upload"
              className="w-32 rouned-sm inline-block"
            />
            <h4 className="font-anta">Upload</h4>
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="file-input"
            name="productImage"
            multiple
            hidden
            className="bg-primary text-black outline-none max-w-80 w-full py-3 px-4 rounded-md"
          />
        </div>
      ) : (
        <div className="mt-10">
          <h4 className="font-anta bold-18 pb-2">Current Images:</h4>
          <div className="flex justify-center items-center gap-x-4">
            {productData?.imageUrls?.map((url, index) => (
              <div
                key={index}
                className="mb-2 flex flex-col justify-center items-center text-center"
              >
                <img
                  src={url}
                  alt={`Current ${index + 1}`}
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
        UPDATE PRODUCT
      </button>

      {showLoader && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;









// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setShowLoader(true);
//   const formData = new FormData();
//   formData.append("name", productData.name);
//   formData.append("categoryName", productData.categoryName);
//   formData.append("new_price", productData.new_price);
//   formData.append("old_price", productData.old_price);
//   formData.append("description", productData.description);
//   formData.append("sizes", productData.sizes.join(","));
//   formData.append("available", productData.available);
 
//   // Append images, categoryBanner, and categoryThumbnail to formData if they exist
//   if (productData.images && productData.images.length > 0) {
//      Array.from(productData.images).forEach((file, index) => {
//        formData.append("images", file);
//      });
//   }
 
//   if (productData.categoryBanner && productData.categoryBanner.length > 0) {
//      formData.append("categoryBanner", productData.categoryBanner[0]);
//   }
 
//   if (productData.categoryThumbnail && productData.categoryThumbnail.length > 0) {
//      formData.append("categoryThumbnail", productData.categoryThumbnail[0]);
//   }
 
//   try {
//      const token = localStorage.getItem("token");
//      const response = await api.put(`/products/update/${id}`, formData, {
//        headers: {
//          Authorization: `Bearer ${token}`,
//          "Content-Type": "multipart/form-data",
//        },
//      });
//      const data = response.data;
//      console.log(data);
//      // Handle success or error based on the response
//      if (response.status >= 200 && response.status < 300) {
//        toast.success("🦄 Product Updated", {
//          position: "bottom-right",
//          autoClose: 3000,
//          hideProgressBar: false,
//          closeOnClick: true,
//          pauseOnHover: true,
//          draggable: true,
//          progress: undefined,
//          theme: "dark",
//          transition: Zoom,
//        });
//        // Navigate back to the product list after successful update
//        // window.location.href = "/admin/productlist"; // Use window.location.href to navigate
//      } else {
//        console.error("Unexpected response status:", response.status);
//      }
 
//      // Reset form
//      setProductData({
//        name: "",
//        categoryName: "",
//        new_price: "",
//        old_price: "",
//        description: "",
//        sizes: [],
//        images: null,
//        categoryThumbnail: null,
//        categoryBanner: null,
//        imageUrls: [], //store temp image urls
//        bannerUrl: [],
//        thumbnailUrl: [],
//        available: true,
//      });
//      setShowUpload(true);
//      setShowUpload2(true);
//      setShowUpload3(true);
//      setShowLoader(false);
//   } catch (error) {
//      console.error("Error:", error);
//      toast.error("Error updating product. Please try again.", {
//        position: "bottom-right",
//        autoClose: 1000,
//        hideProgressBar: false,
//        closeOnClick: true,
//        pauseOnHover: true,
//        draggable: true,
//        progress: undefined,
//        theme: "dark",
//        transition: Zoom,
//      });
//      setShowLoader(false);
//   }
//  };