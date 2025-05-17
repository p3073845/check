import React from "react";
import PageHeader from "../components/commonFunc/PageHeader";

const Adduser = () => {
  return (
    <div>
      {/* start page title */}
      <PageHeader />
      {/* end page title */}
      <div className="main_card">
        <div className="row">
          <div className="col-lg-12">
            <form>
              <div className="row">
                <div className="col-lg-3">
                  <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter User Name"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter Email"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile No.</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="mobile"
                      placeholder="Enter Mobile No."
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group">
                    <label htmlFor="role">Role Assign</label>
                    <select id="role" className="form-control">
                      <option>Roll Assign</option>
                      <option>Admin</option>
                      <option>Super Admin</option>
                      <option>Account Manager</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date" className="form-control" id="date" />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-color">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adduser;
