import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dashboardAction } from "../redux/dashboard/dashboardAction";


const Dashboard = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  // Access the dashboard state
  const dashboardData = useSelector((state) => state.dashboard.dashboardData);
  const loading = useSelector((state) => state.dashboard.loading);
  const initialFetchRef = useRef(false);
  useEffect(() => {
    if (!initialFetchRef.current) {
      dispatch(dashboardAction({ userData: {} }));
      initialFetchRef.current = true;
    }
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="">
        {/* start page title */}
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">2FA</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
              <h4 className="page-title">Dashboard</h4>
            </div>
          </div>
        </div>
        {/* end page title */}
        {loading ? (
          <div className="text-center" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {dashboardData?.[0]?.sub_admin_count !== undefined && (
              <Link to="admin-management" className="col-md-6 col-xl-4">
                <div className="card-box tilebox-one">
                  <i className="mdi mdi-account-multiple-outline float-right m-0 h2 text-muted" />
                  <h6 className="text-muted text-uppercase mt-0">
                    TOTAL ADMIN
                  </h6>
                  <h3 className="my-3">{dashboardData[0].sub_admin_count}</h3>
                </div>
              </Link>
            )}

            {dashboardData?.[0]?.client_count !== undefined && (
              <Link to="client-management" className="col-md-6 col-xl-4">
                <div className="card-box tilebox-one">
                  <i className="mdi mdi-account-multiple-outline float-right m-0 h2 text-muted" />
                  <h6 className="text-muted text-uppercase mt-0">
                    TOTAL CLIENTS
                  </h6>
                  <h3 className="my-3">{dashboardData[0].client_count}</h3>
                </div>
              </Link>
            )}

            {dashboardData?.[0]?.site_count !== undefined && (
              <Link to="site-management" className="col-md-6 col-xl-4">
                <div className="card-box tilebox-one">
                  <i className="mdi mdi-file-document-box-search-outline float-right m-0 h2 text-muted" />
                  <h6 className="text-muted text-uppercase mt-0">
                    TOTAL SITES
                  </h6>
                  <h3 className="my-3">{dashboardData[0].site_count}</h3>
                </div>
              </Link>
            )}

            {dashboardData?.[0]?.user_count !== undefined && (
              <Link to="site-user" className="col-md-6 col-xl-4">
                <div className="card-box tilebox-one">
                  <i className="mdi mdi-account-multiple-plus-outline float-right m-0 h2 text-muted" />
                  <h6 className="text-muted text-uppercase mt-0">
                    TOTAL USERS
                  </h6>
                  <h3 className="my-3">{dashboardData[0].user_count}</h3>
                </div>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
