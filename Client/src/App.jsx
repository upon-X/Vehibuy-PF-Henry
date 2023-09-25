import React from "react";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart.jsx";
import Detail from "./components/Home/Detail/Detail";
import Footer from "./components/Home/Footer/Footer";
import ForgotPassword from "./components/LoginRegister/ForgotPassword";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/LoginRegister/Login";
import Register from "./components/LoginRegister/Register";
import NavBar from "./components/NavBar/NavBar";
import Favorites from "./components/Favorites/Favorites";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProductUser from "./components/Form/CreateProductUser/CreateProductUser.jsx";
import CreateProduct from "./components/Dashboard/CreateProduct/CreateProduct.jsx";
import ProductsUpdate from "./components/Dashboard/ProductsUpdate/ProductsUpdate.jsx"
import ProductsUpdateUser from "./components/Form/CreateProductUser/ProductsUpdateUser.jsx"
import Modification from "./components/Modification/Modification";
import Termsandconditions from "./components/TermsAndConditions/TermsAndConditions";
import ProfileDashboard from "./components/ProfileDashboard/ProfileDashboard.jsx";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:7183/";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/forgotpassword" element={<ForgotPassword />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/termsandconditions" element={<Termsandconditions />} />
        <Route path="/profile" element={<ProfileDashboard />} />
        <Route path="/publish-your-car" element={<CreateProductUser />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard/create" element={<CreateProduct />} />
        <Route path="/admin/dashboard/edit/:id" element={<ProductsUpdate />} />
        <Route path="/user/edit/:id" element={<ProductsUpdateUser />} />
        <Route path="/profileSettings" element={<Modification />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
