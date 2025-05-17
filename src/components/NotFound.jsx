import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate("/");
  };

  return (
    <div className="account-pages mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-pattern">
              <div className="card-body p-4">
                <div className="text-center">
                  <div className="my-3">
                    <i
                      className="mdi mdi-alert-circle-outline text-danger"
                      style={{ fontSize: "80px" }}
                    ></i>
                  </div>
                  <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 font-weight-bold">
                      Page Not Found
                    </h4>
                  </div>
                  <h1 className="h1 font-weight-bold mt-3">404</h1>

                  <button
                    className="btn btn-color mt-3"
                    onClick={handleNavigateToLogin}
                  >
                    <i className="mdi mdi-login mr-1"></i> Go To Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
