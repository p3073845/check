import React, { useState, useEffect } from 'react';

const EditModal = ({ show, onClose, clientId, onEdit, userData, modalType = 'Client' }) => {
  const modalClasses = show ? 'modal fade show d-block' : 'modal fade';
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: ''
  });

  useEffect(() => {
    if (clientId && show && userData) {
      const currentUser = userData.find(user => user.id === clientId);
      if (currentUser) {
        setFormData({
          name: currentUser.name || '',
          email: currentUser.email || '',
          status: currentUser.status || ''
        });
      }
    }
  }, [clientId, show, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    onEdit({
      user_id: clientId,
      ...formData
    });
  };

  return (
    <>
      {show && <div className="modal-backdrop fade show"></div>}
      <div className={modalClasses} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit {modalType}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={onClose}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditUser}>
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="status">Status</label>
                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div className="text-end d-flex justify-content-end">
                  <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-color ml-3">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;