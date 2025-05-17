import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/commonFunc/PageHeader";
import DeleteModal from "../components/modals/DeleteModal";
import CustomTooltip from "../components/commonFunc/CustomTooltip";

const PanelManagement = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleAddUser = (e) => {
    e.preventDefault();
    navigate("/add-user");
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div>
      <PageHeader />

      <div className="main_card">
        <div className="row">
          <div className=" col-md-4 col-sm-6">
            <div className="form-group">
              <label htmlFor="panelName">Panel Name</label>
              <input
                type="text"
                className="form-control"
                id="panelName"
                placeholder="Enter Panel Name"
              />
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" className="form-control">
                <option>Status</option>
                <option>Enable</option>
                <option>Disable</option>
              </select>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="form-group ">
              <button type="submit" className="btn btn-color submit_btnbox">
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 mb-3">
            <div className="table_flexheader">
              <div className="app-search-box">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <div className="input-group-append">
                    <button className="btn" type="submit">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
              <Link
                to="/add-user"
                onClick={handleAddUser}
                className="btn btn-color waves-effect waves-light"
              >
                <span className="btn-label">
                  <i className="fas fa-plus-square" />
                </span>
                Add User
              </Link>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Email Id </th>
                    <th>Mobile No.</th>
                    <th>Role</th>
                    <th>Date</th>
                    <th>Last Login</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Rahul</td>
                    <td>Rahul256@gmil.com</td>
                    <td>5602872649</td>
                    <td>Admin</td>
                    <td>8 April 2025</td>
                    <td>2 Days Go</td>
                    <td>
                      <div className="Actionbtn_table">
                        <CustomTooltip content="Edit">
                          <button
                            // to="/add-user"
                            onClick={handleAddUser}
                            className="btn waves-effect waves-light btn-purple"
                          >
                            <i className="mdi mdi-account-edit-outline" />
                          </button>
                        </CustomTooltip>
                        <CustomTooltip content="Delete">
                          <button
                            className="btn waves-effect waves-light btn-danger"
                            onClick={handleAddUser}
                          >
                            <i className="mdi mdi-delete-alert" />
                          </button>
                        </CustomTooltip>
                       
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Rahul</td>
                    <td>Rahul256@gmil.com</td>
                    <td>5602872649</td>
                    <td>Admin</td>
                    <td>8 April 2025</td>
                    <td>2 Days Go</td>
                    <td>
                      <div className="Actionbtn_table">
                        <CustomTooltip content="Edit">
                          <Link
                            to="/add-user"
                            onClick={handleAddUser}
                            className="btn waves-effect waves-light btn-purple"
                          >
                            <i className="mdi mdi-account-edit-outline" />
                          </Link>
                        </CustomTooltip>
                        <CustomTooltip content="Delete">
                          <button
                            className="btn waves-effect waves-light btn-danger"
                            onClick={() => handleDeleteClick(1)}
                          >
                            <i className="mdi mdi-delete-alert" />
                          </button>
                        </CustomTooltip>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Rahul</td>
                    <td>Rahul256@gmil.com</td>
                    <td>5602872649</td>
                    <td>Admin</td>
                    <td>8 April 2025</td>
                    <td>2 Days Go</td>
                    <td>
                      <div className="Actionbtn_table">
                        <CustomTooltip content="Edit">
                          <Link
                            to="/add-user"
                            onClick={handleAddUser}
                            className="btn waves-effect waves-light btn-purple"
                          >
                            <i className="mdi mdi-account-edit-outline" />
                          </Link>
                        </CustomTooltip>
                        <CustomTooltip content="Delete">
                          <button
                            className="btn waves-effect waves-light btn-danger"
                            onClick={() => handleDeleteClick(1)}
                          >
                            <i className="mdi mdi-delete-alert" />
                          </button>
                        </CustomTooltip>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Rahul</td>
                    <td>Rahul256@gmil.com</td>
                    <td>5602872649</td>
                    <td>Admin</td>
                    <td>8 April 2025</td>
                    <td>2 Days Go</td>
                    <td>
                      <div className="Actionbtn_table">
                        <CustomTooltip content="Edit">
                          <Link
                            to="/add-user"
                            onClick={handleAddUser}
                            className="btn waves-effect waves-light btn-purple"
                          >
                            <i className="mdi mdi-account-edit-outline" />
                          </Link>
                        </CustomTooltip>
                        <CustomTooltip content="Delete">
                          <button
                            className="btn waves-effect waves-light btn-danger"
                            onClick={() => handleDeleteClick(1)}
                          >
                            <i className="mdi mdi-delete-alert" />
                          </button>
                        </CustomTooltip>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Rahul</td>
                    <td>Rahul256@gmil.com</td>
                    <td>5602872649</td>
                    <td>Admin</td>
                    <td>8 April 2025</td>
                    <td>2 Days Go</td>
                    <td>
                      <div className="Actionbtn_table">
                        <CustomTooltip content="Edit">
                          <Link
                            to="/add-user"
                            onClick={handleAddUser}
                            className="btn waves-effect waves-light btn-purple"
                          >
                            <i className="mdi mdi-account-edit-outline" />
                          </Link>
                        </CustomTooltip>
                        <CustomTooltip content="Delete">
                          <button
                            className="btn waves-effect waves-light btn-danger"
                            onClick={() => handleDeleteClick(1)}
                          >
                            <i className="mdi mdi-delete-alert" />
                          </button>
                        </CustomTooltip>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        show={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default PanelManagement;
