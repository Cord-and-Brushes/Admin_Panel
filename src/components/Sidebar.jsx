import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  PlusOutlined,
  UnorderedListOutlined,
  MenuOutlined,
  CloseOutlined,
  HomeOutlined,
  UserOutlined,
  FileImageOutlined,
  FlagOutlined,
  ShoppingCartOutlined,
  FormOutlined,
  FundOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Sidebar = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (!isDesktopOrLaptop) {
      setIsSidebarOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`py-7 flex flex-col gap-x-1 gap-y-5 w-full bg-black sm:gap-x-4 lg:max-w-[250px] ${
        isDesktopOrLaptop ? "flex-shrink-0" : ""
      } lg:flex-col lg:pt-20 lg:max-w-60 lg:h-[screen] lg:justify-start lg:pl-6 scrollable-sidebar`}
    >
      {!isDesktopOrLaptop && (
        <button
          onClick={toggleSidebar}
          className="p-5 text-white flex cursor-pointer"
        >
          {isSidebarOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      )}

      {/* Home */}
      <div
        className={`p-5 flex hover:text-purple-400 medium-16 ${
          !isDesktopOrLaptop && !isSidebarOpen ? "hidden" : ""
        }`}
      >
        <Link to={""} onClick={closeSidebar}>
          <button
            className={`font-anta flex justify-center items-center gap-x-2 ${
              isActive("")
                ? "border-b-2 border-orange-600 text-orange-600"
                : "border-b-black hover:border-b-white"
            } hover:text-orange-600 text-white`}
          >
            <HomeOutlined />
            Home
          </button>
        </Link>
      </div>

      {/* USERS LIST */}
      <div
        className={`p-5 flex medium-16 ${
          !isDesktopOrLaptop && !isSidebarOpen ? "hidden" : ""
        }`}
      >
        <Link to={"userlist"} onClick={closeSidebar}>
          <button
            className={`font-anta flex justify-center items-center gap-x-2 ${
              isActive("/")
                ? "border-b-2 border-orange-600 text-orange-600"
                : "border-b-black hover:border-b-white"
            } hover:text-orange-600 text-white`}
          >
            {" "}
            <UserOutlined />
            Users
          </button>
        </Link>
      </div>

      {/* Products Accordion */}
      <Accordion
        sx={{
          backgroundColor: "black", // Set the background color to black
          "&:hover": {
            backgroundColor: "black", // Optional: Change the hover background color
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: "white",
                "&:hover": {
                  color: "#ea580c", // Optional: Change the hover background color
                },
              }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{
              color: "white",
              "&:hover": {
                color: "#ea580c", // Optional: Change the hover background color
              },
              fontFamily: "anta",
            }}
          >
            <div className="flex justify-center items-center font-anta gap-x-2">
              <ShoppingCartOutlined /> Products
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="flex flex-col gap-y-4">
              <div>
                <Link to={"addproduct"} onClick={closeSidebar}>
                  <button
                    className={`font-anta flex justify-center items-center gap-x-2 gap-y-6 ${
                      isActive("addproduct")
                        ? "border-b-2 border-orange-600 text-orange-600"
                        : "border-b-black hover:border-b-white"
                    } hover:text-orange-600 text-white`}
                  >
                    <PlusOutlined />
                    Add Products
                  </button>
                </Link>
              </div>
              <div>
                <Link to={"productlist"} onClick={closeSidebar}>
                  <button
                    className={`font-anta flex justify-center items-center gap-x-2 gap-y-6 ${
                      isActive("productlist")
                        ? "border-b-2 border-orange-600 text-orange-600"
                        : "border-b-black hover:border-b-white"
                    } hover:text-orange-600 text-white`}
                  >
                    <UnorderedListOutlined />
                    Products List
                  </button>
                </Link>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Blogs Accordion */}
      <Accordion
        sx={{
          backgroundColor: "black", // Set the background color to black
          "&:hover": {
            backgroundColor: "black", // Optional: Change the hover background color
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: "white",
                "&:hover": {
                  color: "#ea580c", // Optional: Change the hover background color
                },
              }}
            />
          }
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography
            sx={{
              color: "white",
              "&:hover": {
                color: "#ea580c", // Optional: Change the hover background color
              },
              fontFamily: "anta",
            }}
          >
            <div className="flex justify-center items-center font-anta gap-x-2">
              <FormOutlined />
              Blogs
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="flex flex-col gap-y-4">
              <div>
                <Link to={"addblog"} onClick={closeSidebar}>
                  <button
                    className={`font-anta flex justify-center items-center gap-x-2 gap-y-6 ${
                      isActive("productlist")
                        ? "border-b-2 border-orange-600 text-orange-600"
                        : "border-b-black hover:border-b-white"
                    } hover:text-orange-600 text-white`}
                  >
                    <PlusOutlined />
                    Create Blog
                  </button>
                </Link>
              </div>

              <div>
                <Link to={"allblogs"} onClick={closeSidebar}>
                  <button
                    className={`font-anta flex justify-center items-center gap-x-2 gap-y-6 ${
                      isActive("productlist")
                        ? "border-b-2 border-orange-600 text-orange-600"
                        : "border-b-black hover:border-b-white"
                    } hover:text-orange-600 text-white`}
                  >
                    <UnorderedListOutlined />
                    All Blogs
                  </button>
                </Link>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Banners Accordion */}
      <Accordion
        sx={{
          backgroundColor: "black", // Set the background color to black
          "&:hover": {
            backgroundColor: "black", // Optional: Change the hover background color
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: "white",
                "&:hover": {
                  color: "#ea580c", // Optional: Change the hover background color
                },
              }}
            />
          }
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography
            sx={{
              color: "white",
              "&:hover": {
                color: "#ea580c", // Optional: Change the hover background color
              },
              fontFamily: "anta",
            }}
          >
            <div className="flex justify-center items-center font-anta gap-x-2">
              <FundOutlined /> Banners
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="flex flex-col gap-y-4">
              <div>
                <Link to={"bannersection"} onClick={closeSidebar}>
                  <button
                    className={`font-anta flex justify-center items-center gap-x-2 ${
                      isActive("bannersection")
                        ? "border-b-2 border-orange-600 text-orange-600"
                        : "border-b-black hover:border-b-white"
                    } hover:text-orange-600 text-white`}
                  >
                    <FlagOutlined />
                    Upload Banner
                  </button>
                </Link>
              </div>
              <div>
                <Link to={"allbanners"} onClick={closeSidebar}>
                  <button
                    className={`font-anta flex justify-center items-center gap-x-2 ${
                      isActive("allbanners")
                        ? "border-b-2 border-orange-600 text-orange-600"
                        : "border-b-black hover:border-b-white"
                    } hover:text-orange-600 text-white`}
                  >
                    <MenuOutlined />
                    All Banners
                  </button>
                </Link>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Exhibitions Accordion */}
      <Accordion
        sx={{
          backgroundColor: "black", // Set the background color to black
          "&:hover": {
            backgroundColor: "black", // Optional: Change the hover background color
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: "white",
                "&:hover": {
                  color: "#ea580c", // Optional: Change the hover background color
                },
              }}
            />
          }
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography
            sx={{
              color: "white",
              "&:hover": {
                color: "#ea580c", // Optional: Change the hover background color
              },
              fontFamily: "anta",
            }}
          >
            <div className="flex justify-center items-center font-anta gap-x-2">
            <PictureOutlined />
              Exhibitions
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="flex flex-col gap-y-4">
              <div>
                {" "}
                <Link to={"productlist"} onClick={closeSidebar}>
                  <button
                    className={`font-anta flex justify-center items-center gap-x-2 ${
                      isActive("productlist")
                        ? "border-b-2 border-orange-600 text-orange-600"
                        : "border-b-black hover:border-b-white"
                    } hover:text-orange-600 text-white`}
                  >
                    <FileImageOutlined />
                    All Exhibition Post
                  </button>
                </Link>
              </div>
              <div>
                <Link to={"productlist"} onClick={closeSidebar}>
                  <button
                    className={`font-anta flex justify-center items-center gap-x-2 ${
                      isActive("productlist")
                        ? "border-b-2 border-orange-600 text-orange-600"
                        : "border-b-black hover:border-b-white"
                    } hover:text-orange-600 text-white`}
                  >
                    <FileImageOutlined />
                    Create Exhi. Post
                  </button>
                </Link>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Sidebar;
