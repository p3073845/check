
import React from "react";
import { Link, useLocation } from "react-router-dom";

const PageHeader = () => {
  const location = useLocation();
  
  // Function to create proper breadcrumb paths and titles
  const generateBreadcrumbs = (path) => {
    // Remove leading slash and split by '/'
    const pathSegments = path.replace(/^\//, "").split("/");
    
    // Generate breadcrumb items with proper hierarchy
    const breadcrumbs = [];
    let currentPath = "";
    
    pathSegments.forEach((segment, index) => {
      // Build up the path as we go
      currentPath += `/${segment}`;
      
      // Format the title from segment (convert kebab-case to Title Case)
      const title = segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      
      breadcrumbs.push({
        path: currentPath,
        title: title,
        isActive: index === pathSegments.length - 1
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs(location.pathname);
  const pageTitle = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].title : "Dashboard";
  
  return (
    <div className="row">
      <div className="col-12">
        <div className="page-title-box">
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <li className="breadcrumb-item">
                <Link to="/">2FA</Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className={`breadcrumb-item ${crumb.isActive ? "active" : ""}`}>
                  {crumb.isActive ? (
                    crumb.title
                  ) : (
                    <Link to={crumb.path}>{crumb.title}</Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <h4 className="page-title">{pageTitle}</h4>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;