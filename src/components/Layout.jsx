// src/components/Layout.js
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { setMobile } from "../redux/slices/sidebarSlice";
import { setNavigate } from "../utils/navigationService";
import Footer from "./Footer";

const Layout = () => {
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Initialize navigation service with navigate function
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  // Check if the user is authenticated
  useEffect(() => {
    if (!userToken) {
      navigate('/login');
    }
  }, [userToken, navigate]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      dispatch(setMobile(width < 1024));
      // Set initial classes based on screen width
      document.body.classList.remove("sidebar-enable", "enlarged");

      if (width < 768) {
        document.body.classList.remove("enlarged");
        document.body.classList.remove("sidebar-enable");
      } else if (width > 767 && width < 1024) {
        document.body.classList.add("enlarged");
      } else {
        document.body.classList.add("sidebar-enable");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  // If no user, return null
  if (!userToken) return null;

  return (
    <div id="wrapper">
      <Header />
      <Sidebar />
      <div className="content-page">
        <div className="content">
          <div className="container-fluid" style={{ minHeight: 'calc(100vh - 140px)' }}>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
