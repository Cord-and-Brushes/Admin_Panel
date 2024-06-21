import React from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../components/AddProduct';
import ProductList from '../components/ProductList';
import EditProduct from '../components/EditProduct';
import Home from '../components/Home';
import Navbar from '../components/Navbar';
import UserList from '../components/UserList';
import BannerSection from '../components/BannerSection';
import AllBanners from '../components/AllBanners';
import EditBanner from '../components/EditBanner';
import AddBlog from '../components/AddBlog';
import AllBlogs from '../components/AllBlogs';
import EditBlog from '../components/EditBlog';
import AddCategory from '../components/AddCategory';
import AllCategories from '../components/AllCategories';

// 

const Admin = () => {
 return (
 <div className='bg-gradient-to-r from-blue-400 via-orange-700 to-blue-400'>
    <div>
    </div>
    <div className='lg:flex'>
      <Sidebar />
      
      <Routes>
        {/* Adjusted paths to be relative */}
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="" element={<Home />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="editproduct/:id" element={<EditProduct />} />
        <Route path="userlist" element={<UserList />} />
        <Route path="bannersection" element={<BannerSection />} />
        <Route path="allbanners" element={<AllBanners />} />
        <Route path="editbanner/:id" element={<EditBanner />} />
        <Route path="addblog"  element={<AddBlog />}/>
        <Route path="allblogs"  element={<AllBlogs />}/>
        <Route path="editblog/:id"  element={<EditBlog />}/>
        <Route path="addcategory"  element={<AddCategory />}/>
        <Route path="allcategories"  element={<AllCategories />}/>
      </Routes>
    </div>
 </div>
 );
};

export default Admin;
