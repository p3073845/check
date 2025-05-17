import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { closeSidebar } from "../redux/slices/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, isMobile } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  
  // Get menu data from localStorage - useMemo to avoid re-computing on every render
 const side_menu = useMemo(() => {
  const sidebarData = JSON.parse(localStorage.getItem("user")) || {};
  const menuData = sidebarData.token?.menu_data || [];
  
  // Sort the menu items by position
  return menuData.sort((a, b) => a.position - b.position);
}, []);

  console.log("side_menu", side_menu);
  // Initialize state for tracking open submenus
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    const newOpenMenus = {};
    
    side_menu.forEach(item => {
      if (item.children) {
        const isSubMenuActive = item.children.some(child => 
          `/${child.link}` === location.pathname
        );
        if (isSubMenuActive) {
          newOpenMenus[item.id] = true;
        }
      }
    });
    
    setOpenMenus(newOpenMenus);
  }, [location.pathname]);

  const handleNavigation = (e, path) => {
    e.preventDefault();
    if (isMobile) {
      dispatch(closeSidebar());
      document.body.classList.remove('sidebar-enable');
    }
    navigate(`/${path}`);
  };

  const toggleSubmenu = (e, menuId) => {
    e.preventDefault();
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const isActive = (path) => location.pathname === `/${path}`;
  
  const isSubmenuActive = (children) => 
    children && children.some(item => isActive(item.link));

  // Render a regular menu item (no submenu)
  const renderMenuItem = (menuItem) => (
    <li key={menuItem.id} className={isActive(menuItem.link) ? "mm-active" : ""}>
      <a
        href={`/${menuItem.link}`}
        className={isActive(menuItem.link) ? "active" : ""}
        onClick={(e) => handleNavigation(e, menuItem.link)}
      >
        <i className={menuItem.icon} />
        <span> {menuItem.name} </span>
      </a>
    </li>
  );

  // Render a submenu item with children
  const renderSubmenu = (menuItem) => {
    const isOpen = openMenus[menuItem.id];
    const isMenuItemActive = isSubmenuActive(menuItem.children);
    
    return (
      <li key={menuItem.id} className={isMenuItemActive || isOpen ? "mm-active" : ""}>
        <a
          href="#"
          onClick={(e) => toggleSubmenu(e, menuItem.id)}
          className={`waves-effect d-flex justify-content-between align-items-center ${
            isMenuItemActive || isOpen ? "active" : ""
          }`}
        >
          <div className="d-flex align-items-center">
            <i className={menuItem.icon} />
            <span>{menuItem.name}</span>
          </div>
          <span className="arrow-icon mt-1">
            <i className={`mdi mdi-chevron-${isOpen ? "down" : "right"}`} />
          </span>
        </a>
        <ul className={`nav-second-level nav ${isOpen ? "mm-show" : "mm-collapse"}`}>
          {menuItem.children.map((child) => (
            <li key={child.id} className={isActive(child.link) ? "mm-active" : ""}>
              <a
                href={`/${child.link}`}
                className={isActive(child.link) ? "active" : ""}
                onClick={(e) => handleNavigation(e, child.link)}
              >
                {child.name}
              </a>
            </li>
          ))}
        </ul>
      </li>
    );
  };

  return (
    <div className="left-side-menu">
      <div className="slimscroll-menu">
        <div id="sidebar-menu">
          <ul className="metismenu" id="side-menu">
            {side_menu.map((menuItem) => (
              menuItem.children 
                ? renderSubmenu(menuItem) 
                : renderMenuItem(menuItem)
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;