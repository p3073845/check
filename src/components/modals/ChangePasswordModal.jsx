import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ChangePasswordModal = ({ show, onClose, clientId, apiAction }) => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Add random form name to prevent browser autofill
  const formName = React.useMemo(() => `form_${Math.random().toString(36).substr(2, 9)}`, []);

  // Reset form state when modal closes
  const handleClose = () => {
    setNewPassword('');
    setConfirmPassword('');
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  const handleSubmit = () => {
    if (!newPassword) {
      toast.error('Please fill new password fields', { toastId: 'new-password-required' });
      return;
    }
    if(!confirmPassword){
       toast.error('Please fill confirm password fields', { toastId: 'confirm-password-required' });
        return;
    }
    
    else if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match', { toastId: 'password-match-error' });
      return;
    }

    dispatch(apiAction({
      payload: {
      id: clientId,
      new_password: newPassword,
      confirm_password: confirmPassword
      }
    }))
    .unwrap()
    .then((response) => {
      if (response.error === false) {
        toast.success('Password changed successfully', { toastId: 'password-change-success' });
        setNewPassword('');
        setConfirmPassword('');
        onClose();
      } else {
        toast.error(response.message || 'Failed to change password', { toastId: 'password-change-error-response' });
      }
    })
    .catch((error) => {
      toast.error(error.message || 'Failed to change password', { toastId: 'password-change-error' });
    });
  };

  return (
    <>
      {show && (
        <>
          <div className="modal fade show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '400px' }}>
              <div className="modal-content">
                <div className="modal-header ">
                  <h5 className="modal-title">Change Password</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onClick={handleClose}>×</button>
                </div>
               
                <div className="modal-body pt-2">
                  <form name={formName} autoComplete="off">
                    <div className="mb-3">
                      <label className="form-label">New Password</label>
                      <div className="input-group">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          className="form-control"
                          name="newPassword"
                          placeholder="Enter Your New Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          autoComplete="new-password"
                          data-lpignore="true"
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
                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <div className="input-group">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Enter Your Confirm Password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          autoComplete="new-password"
                          data-lpignore="true"
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{ cursor: 'pointer' }}
                          >
                            <i className={showConfirmPassword ? "mdi mdi-eye-off" : "mdi mdi-eye"} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer border-top-0">
                  <button 
                    type="button" 
                    className="btn"
                    style={{ 
                      backgroundColor: '#dce1e6', 
                      color: '#000',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => e.target.style.backgroundColor = '#c1c9d1'}
                    onMouseLeave={e => e.target.style.backgroundColor = '#dce1e6'}
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn px-4"
                    style={{ 
                      backgroundColor: '#2b3d51', 
                      color: '#fff',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => e.target.style.backgroundColor = '#1e2a38'}
                    onMouseLeave={e => e.target.style.backgroundColor = '#2b3d51'}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
};

export default ChangePasswordModal;


