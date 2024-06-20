import React, { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { TbTrash } from "react-icons/tb";
import { RiEdit2Line } from "react-icons/ri";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Empty from "../assets/empty-cart.jpg";
import { fetchPosts } from "../features/postSlice";
import api from "../api/api";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/api/blogs/allblogs");
        const data = response.data.posts;
        setBlogs(data);
        console.log("response", response);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        // Optionally, show an error toast
        toast.error("Failed to fetch banners. Please try again.", {
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
      }
    };

    fetchBlogs();
  }, [dispatch]);
  console.log(blogs);

  const handleRemoveBlog = async (id) => {
    setBlogToDelete(id); // Set the product ID to be deleted
    setIsModalOpen(true);
  };

  const deleteBlog = async (id) => {
    setShowLoader(true); // Show loader when removing a product
    try {
      // dispatch(deleteProduct(id));
      setBlogs(blogs.filter((post) => post.id !== id));
      toast.success("Product removed successfully", {
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
    } catch (error) {
      console.error("Error removing product:", error);
    }
    setShowLoader(false);
    setIsModalOpen(false);
  };

  const handleEditBlog = (id) => {
    setShowLoader(true); // Show loader when navigating to edit product
    navigate(`/admin/editblog/${id}`);
    setShowLoader(false); // Hide loader after navigation
  };

  return (
    <div className="text-white font-anta p-8 box-border bg-black/15 w-full rounded-sm mt-4 lg:m-7">
      <h1 className="bold-22 font-anta text-center mb-5">All Blogs</h1>
      <div>
        {blogs?.length === 0 ? (
          <div className="flex flex-col justify-center items-center bg-black/60 py-8 rounded-full">
            <img src={Empty} className="rounded-full h-64" />
            <p className="font-anta text-white text-center mt-5">
              No Blogs to show
            </p>
          </div>
        ) : (
          <div>
            {blogs?.map((post) => (
              <div className="ring-1 ring-white p-6 lg:p-12 mb-4">
                <div className="flex lg:flex-row flex-col-reverse justify-between">
                  <div>
                    <h1 className="text-[24px] font-anta my-2">{post.title}</h1>
                    <p className="text-white">{new Date(post.datePosted).toLocaleDateString()}</p>
                    <div className="mt-4 flex justify-between w-[50px]">
                  <button
                    className="hover:text-orange-600"
                    onClick={() => handleRemoveBlog(post._id)}
                  >
                    <TbTrash className="text-[22px]" />
                  </button>
                  <button
                    className="hover:text-orange-600"
                    onClick={() => handleEditBlog(post._id)}
                  >
                    <RiEdit2Line className="text-[22px]" />
                  </button>
                </div>
                  </div>
                  <div>
                    <img className="h-[30vh] lg:h-[50vh]" src={post.bannerImage} />
                  </div>
                </div>
                <div>
                  <p className="text-white font-anta text-[18px] pt-3">{post.content}</p>
                </div>
                
              </div>
            ))}
          </div>
        )}
        {showLoader && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="spinner"></div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Delete Confirmation"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this product?</p>
        <div className="flex gap-x-5 mt-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="btn_dark_rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteProducts(productToDelete)}
            className="btn_dark_rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AllBlogs;
