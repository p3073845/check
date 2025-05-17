import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo_sm from "../assets/images/logo.png";
import logo from "../assets/images/logo.png";
import { navigate } from "../utils/navigationService";
import { logoutUserAction } from "../redux/auth/authActions";

const Header = () => {
  const { loading } = useSelector((state) => state.auth);
  const userName = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUserAction());
  };

  //  handleSidebarToggle function
  const handleSidebarToggle = () => {
    const width = window.innerWidth;

    if (width <= 768) {
      // Mobile view - only toggle sidebar-enable
      document.body.classList.toggle("sidebar-enable");
    } else if (width > 768 && width < 1024) {
      document.body.classList.toggle("enlarged");
    } else {
      // Desktop view - toggle both classes based on current state
      if (document.body.classList.contains("enlarged")) {
        document.body.classList.remove("enlarged");
        document.body.classList.add("sidebar-enable");
      } else {
        document.body.classList.add("enlarged");
        document.body.classList.remove("sidebar-enable");
      }
    }
  };

  const handlePasswordModalOpen = () => {
    navigate("/change-password");
  };

  return (
    <>
      <div className="navbar-custom">
        <ul className="list-unstyled topnav-menu float-right mb-0 mt-3 ">
          <li className="dropdown notification-list">
            <div className="dropdown" ref={dropdownRef}>
              <button
                className="nav-user dropdown-toggle"
                type="button"
                onClick={toggleDropdown}
                style={{ color: "#adb5bd", background: "none", border: "none" }}
              >
                <span className="user-avatar">
                  {userName?.token?.name?.charAt(0) || "U"}
                </span>
                <span className="d-none d-sm-inline-block ml-1 font-weight-medium">
                  {userName?.token?.name || "username"}
                </span>
              </button>
              <div
                className={`dropdown-menu dropdown-menu-right mt-2 ${
                  dropdownOpen ? "show" : ""
                }`}
              >
                <a
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={handlePasswordModalOpen}
                >
                  <span className="pr-2">
                    <i className="ion ion-ios-lock" />
                  </span>
                  <span>Change Password</span>
                </a>
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!loading) {
                      handleLogout();
                    }
                  }}
                >
                  <span className="pr-2">
                    <i className="mdi mdi-power" />
                  </span>
                  <span>{loading ? "Logging out..." : "Logout"}</span>
                </a>
              </div>
            </div>
          </li>
        </ul>

        {/* LOGO */}
        <div className="logo-box">
          <Link to="/" className="logo text-center">
            <span className="logo-lg">
              <img
                src={logo}
                alt="logo"
                width={150}
                height={40}
                style={{ objectFit: "contain" }}
              />
            </span>
            <span className="logo-sm">
              <img src={logo_sm} alt="logo" height={30} width={30} />
            </span>
          </Link>
        </div>
        <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
          <li>
            <button
              className="button-menu-mobile waves-effect waves-light"
              onClick={handleSidebarToggle}
              aria-label="Toggle navigation menu"
            >
              <i className="mdi mdi-menu" />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
