import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAdminAction } from "../redux/admin/AdminAction";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const AddAdmin = () => {
  const dispatch = useDispatch();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    status: "",
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
    //validate name
    const nameRegex = /^[a-zA-Z ]{2,}$/;
    if (!formData.name) {
      toast.error("Please enter a Admin Name", { toastId: 'admin-name-required' });
      return;
    }else if (formData.name.length < 2) {
      toast.error("Admin Name should be at least 2 characters long", { toastId: 'admin-name-length' });
      return;
    } else if(!nameRegex.test(formData.name)) {
      toast.error("Please enter a valid Admin Name not any special characters and numbers", { toastId: 'admin-name-invalid' });
      return;
    } 

    //validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email) {
      toast.error("Please enter an email address", { toastId: 'admin-email-required' });
      return;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address", { toastId: 'admin-email-invalid' });
      return;
    }
   
    if(!formData.password) {
      toast.error("Please enter a password", { toastId: 'admin-password-required' });
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long", { toastId: 'admin-password-length-min' });
      return;
    }
    if(formData.password.length > 16){
      toast.error("Password must be less than 16 characters long", { toastId: 'admin-password-length-max' });
      return;
    }
   
    if (!formData.status) {
      toast.error("Please select a status", { toastId: 'admin-status-required' });
      return;
    }
    //dispatch action 
    dispatch(addAdminAction({ userData: formData })).then((actionResult) => {
      if (
        actionResult.payload.code === 0 &&
        actionResult.payload.error === false
      ) {
        toast.success(actionResult.payload.message, { toastId: 'admin-add-success' });
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
              <Link to='/admin-management'>Admin Management</Link>
            </li>
            <li class="breadcrumb-item active">Add Admin</li>
          </ol>
        </div>
        <h4 class="page-title">Add Admin</h4>
      </div>
      <div className="main_card">
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-3 col-md-3">
                  <div className="form-group">
                    <label htmlFor="name">Admin Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter Admin Name"
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

export default AddAdmin;
