import React, { useState } from "react";
import Upload_area from "../assets/upload.png";
import { PlusOutlined } from "@ant-design/icons";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { createPost } from "../features/postSlice";
import { useEffect } from "react";


const EditBlog = () => {
    const { id } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    content:"",
    author:"",
    quote:"",
    images: null,
    imageUrls: [],
  });

  useEffect(() => {
    const fetchBlogById = 
  })

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevState) => ({...prevState, [name]: value }));
  };


  const handleImageChange = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setBlogData((prevState) => ({
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
    formData.append("title", blogData.title);
    formData.append("author", blogData.author);
    formData.append("quote", blogData.quote);
    formData.append("content", blogData.content);
    if (blogData.images) {
      Array.from(blogData.images).forEach((file, index) => {
        formData.append("images", file);
      });
    }
    

    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/api/blogs/createblog", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"multipart/form-data",
        },
      });

      const data = response.data;
      console.log(response);
      console.log(data);
      // Handle success or error based on the response
      if (data.success) {
        // Show success message only if the request was successful
        toast.success("🦄 Blog Added", {
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
        setBlogData({
            title: "",
            author: "",
            quote:"",
            content: "",
            images: null,
            imageUrls: [], //store temp image urls
          });
          setShowUpload(true);
          setShowLoader(false);
      } else {
        // Optionally, handle other status codes here
        console.error("Unexpected response status:", response.status);
      }      
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
        CREATE BLOG
      </h1>

      {/* ROW 1 / NAME & CATEGORY*/}
      <div className="flex flex-col lg:flex-row gap-x-10">
        {/* TITLE */}
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Blog Title:</h4>
          <input
            type="text"
            name="title"
            placeholder="Type here..."
            className="bg-black/50 outline-none w-full py-3 px-4 rounded-md text-white"
            value={blogData.title}
            onChange={handleInputChange}
          />
        </div>

        {/* AUTHOR */}
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Author:</h4>
          <input
            type="text"
            name="author"
            placeholder="Type here..."
            className="bg-black/50 outline-none w-full py-3 px-4 rounded-md text-white"
            value={blogData.author}
            onChange={handleInputChange}
          />
        </div>

        {/* QUOTE */}
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Quote:</h4>
          <input
            type="text"
            name="quote"
            placeholder="Type here..."
            className="bg-black/50 outline-none w-full py-3 px-4 rounded-md text-white"
            value={blogData.quote}
            onChange={handleInputChange}
          />
        </div>
      </div>


      {/* DESCRIPTION*/}
      <div className="mb-3 w-full">
        <h4 className="font-anta bold-18 pb-2">Content:</h4>
        <textarea
          id="content"
          placeholder="Type here..."
          name="content"
          className="bg-black/50 outline-none w-full py-3 px-4 rounded-md text-white"
          value={blogData.content}
          onChange={handleInputChange}
        />
      </div>


      {/* ROW 5 / UPLOAD IMAGES */}
      {showUpload ? (
        <div className="mt-10">
          <h4 className="font-anta bold-18 pb-2">Add Blog Image:</h4>
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
      {!showUpload && blogData?.imageUrls?.length > 0 && (
        <div className="mt-10">
          <h4 className="font-anta bold-18 pb-2">Selected Images:</h4>
          <div className="gap-x-4">
            {blogData.imageUrls.map((url, index) => (
              <div
                key={index}
                className="mb-2 flex justify-center items-center text-center"
              >
                <img
                  src={url}
                  alt={`Selected ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
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
        Add Blog
      </button>

      {showLoader && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
