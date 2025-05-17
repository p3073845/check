import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PageHeader from "../components/commonFunc/PageHeader";
import {changePasswordAction} from "../redux/users/userActions";
const ChangePassword = () => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = (e) => {
    if (e) e.preventDefault();

    // Validate old password
    if (!oldPassword) {
      toast.error("Please enter your old password", { toastId: 'old-password-required' });
      return;
    }
    // Validate new password
    if (!newPassword) {
      toast.error("Please enter your new password", { toastId: 'new-password-required' });
      return;
    }
    // Validate confirm password
    if (!confirmPassword) {
      toast.error("Please confirm your new password", { toastId: 'confirm-password-required' });
      return;
    }
    // Validate password length

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long", { toastId: 'password-length-error' });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match", { toastId: 'password-match-error' });
      return;
    }

    // Prepare payload with required fields
    const payload = {
     old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    // Dispatch the change password action with the payload
    dispatch(changePasswordAction({ payload }))
      .unwrap()
      .then((data) => {
        if (data && data.code === 0 && data.error === false) {
          toast.success(data.message, { toastId: 'password-change-success' });
      
          // Reset form
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } 
      })
      .catch((error) => {
        toast.error(error.message, { toastId: 'password-change-error' });
      });
  };

  return (
    <div>
      {/* start page title */}
      <PageHeader />
      {/* end page title */}
      <div className="main_card">
        <div className="row">
          <div className="col-lg-4 m-auto">
            <div className="main_card ">
              <div className="mb-3">
                <label className="form-label">Old Password</label>
                <div className="input-group">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter Your Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className={
                          showOldPassword ? "mdi mdi-eye-off" : "mdi mdi-eye"
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">New Password</label>
                <div className="input-group">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter Your New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className={
                          showNewPassword ? "mdi mdi-eye-off" : "mdi mdi-eye"
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter Your Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className={
                          showConfirmPassword ? "mdi mdi-eye-off" : "mdi mdi-eye"
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group text-center mt-3">
                <button
                  onClick={handleChangePassword}
                  className="btn btn-lg Thembtn btn-block waves-effect waves-light"
                  type="submit"
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
