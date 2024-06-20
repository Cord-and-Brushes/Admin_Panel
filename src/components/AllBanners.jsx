import React, { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteBannerImage, getAllBannerImages } from "../features/bannerSlice";
import { useDispatch } from "react-redux";
import { TbTrash } from "react-icons/tb";
import { RiEdit2Line } from "react-icons/ri";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Empty from "../assets/empty-cart.jpg";


const AllBanners = () => {
  const [banners, setBanners] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await dispatch(getAllBannerImages()).unwrap();
        setBanners(response);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
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

    fetchBanners();
  }, [dispatch]);

  console.log(banners);

  const handleRemovebanner = async (id) => {
    setProductToDelete(id); // Set the product ID to be deleted
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    setShowLoader(true); // Show loader when navigating to edit product
    navigate(`/admin/editbanner/${id}`);
    setShowLoader(false); // Hide loader after navigation
  };

  const handleDelete = async (bannerId) => {
    setShowLoader(true);
    try {
      const response = await dispatch(deleteBannerImage(bannerId)).unwrap();
      const response1 = await dispatch(getAllBannerImages()).unwrap();
      setBanners(response1);
      toast.success("Banner deleted successfully", {
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
      setShowLoader(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Failed to delete banner. Please try again.", {
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

  return (
    <div className="text-white font-anta p-8 box-border bg-black/15 h-screen w-full rounded-sm mt-4 lg:m-7">
      <h1 className="bold-22 font-anta text-center mb-5">All Banners</h1>
      {banners?.length > 0 ? (
        <>
        <div className="banners-container">
        {banners.map((banner) => (
          
          <div
            key={banner._id}
            className="banner-item  ring-1 ring-white m-6 p-4 rounded-md"
          >
            <div className="flex justify-between">
              <div>
                <h2 className="bold-18 font-anta text-center mb-5">
                  {banner.pageName}
                </h2>
              </div>
              <div className="gap-x-4 flex">
                <button onClick={() => handleEdit(banner._id)}>
                  <RiEdit2Line className="text-[22px]" />
                </button>
                <button onClick={() => handleRemovebanner(banner._id)}>
                  <TbTrash className="text-[22px]" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              {banner.urls.map((img, index) => (
                <div className="">
                  <img src={img} alt={banner.pageName} className="rounded-md"/>
                </div>
              ))}
            </div>
          </div>
          
        ))}
      </div>
      </>
      ) : (
        <div className="flex flex-col justify-center items-center bg-black/60 py-8 rounded-full">
            <img src={Empty} className="rounded-full h-64" />
            <p className="font-anta text-white text-center mt-5">
              No Products to show
            </p>
          </div>
      )}
      
      {showLoader && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="spinner"></div>
        </div>
      )}

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
            onClick={() => handleDelete(productToDelete)}
            className="btn_dark_rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AllBanners;
