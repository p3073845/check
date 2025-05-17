import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../components/commonFunc/PageHeader";
import { addUserAction } from "../redux/users/userActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const AddClient = () => {
  const dispatch = useDispatch();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    status: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
       const nameRegex = /^[a-zA-Z ]{2,}$/;
        if (!formData.name) {
          toast.error("Please enter a Client Name", { toastId: 'client-name-required' });
          return;
        }else if (formData.name.length < 2) {
          toast.error("Client Name should be at least 2 characters long", { toastId: 'client-name-length' });
          return;
        } else if(!nameRegex.test(formData.name)) {
          toast.error("Please enter a valid Client Name not any special characters and numbers", { toastId: 'client-name-invalid' });
          return;
        } 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address", { toastId: 'client-email-invalid' });
      return;
    }
    
    if (!formData.password) {
      toast.error("Please enter a password", { toastId: 'client-password-required' });
      return;
    }
   

    if (!formData.status) {
      toast.error("Please select a status", { toastId: 'client-status-required' });
      return;
    }

    dispatch(addUserAction({ userData: formData })).then((actionResult) => {
      if (
        actionResult.payload.code === 0 &&
        actionResult.payload.error === false
      ) {
        toast.success(actionResult.payload.message, { toastId: 'client-add-success' });
        handleReset();

      }
    });
  };


  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      status: "",
    });
  }

  return (
    <div>
      <div class="page-title-box">
        <div class="page-title-right">
          <ol class="breadcrumb m-0">
            <li class="breadcrumb-item">
              <Link to='/'> 2FA</Link>
            </li>
            <li class="breadcrumb-item active">
              <Link to='/client-management'>Client Management</Link>
            </li>
            <li class="breadcrumb-item active">Add Client</li>
          </ol>
        </div>
        <h4 class="page-title">Add Client</h4>
      </div>
      <div className="main_card">
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-3 col-md-3">
                  <div className="form-group">
                    <label htmlFor="name">Client Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter Client Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3">
                  <div className="form-group">
                    <label htmlFor="email">Email Id</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter Email Id"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <div className="input-group-append">
                        <span
                          className="input-group-text"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          style={{ cursor: 'pointer' }}
                        >
                          <i className={showNewPassword ? "mdi mdi-eye-off" : "mdi mdi-eye"} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3">
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      className="form-control"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              {loading ? (
                <button type="submit" className="btn btn-color">
                  Submiting...
                </button>
              ) : (
                <>
                  <button type="submit" className="btn btn-color">
                    Submit
                  </button>
                  <button type="reset" className="btn btn-secondary ml-2" onClick={handleReset}>
                    Reset
                  </button>
                </>
              )}

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
