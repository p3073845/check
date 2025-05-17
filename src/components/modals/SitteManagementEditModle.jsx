import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { siteUpdateAction } from '../../redux/site/SitesAction';

const SitteManagementEditModle = ({ show, onClose, siteId, onEdit }) => {
  const dispatch = useDispatch();
  const modalClasses = show ? 'modal fade show d-block' : 'modal fade';
  const siteDate = useSelector((state) => state.site.sites);
  
  const [formData, setFormData] = useState({
    site_id: '',
    site_name: '',
    domain: '',
    ip_address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSite = (e) => {
    e.preventDefault();
    dispatch(siteUpdateAction({ siteData: formData }))
      .unwrap()
      .then((response) => {
        if (!response.error) {
          toast.success(response.message);
          onClose();
          onEdit(formData);
        } else {
          toast.error(response.message,
            {
              toastId: `site-update-error-${response.message}`,
            }
          );
        }
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to update site');
      });
  };

  useEffect(() => {
    if (siteId && show) {
      const currentSite = siteDate?.data?.site_list?.find(site => site.site_id === siteId);
      if (currentSite) {
        setFormData({
          site_id: currentSite.site_id,
          site_name: currentSite.siteName,
          domain: currentSite.domain,
          ip_address: currentSite.ip,
        });
      }
    }
  }, [siteId, show, siteDate]);

  return (
    <>
      {show && <div className="modal-backdrop fade show"></div>}
      <div className={modalClasses} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Site</h5>
              <button type="button" className="close" onClick={onClose}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditSite}>
                <div className="form-group mb-3">
                  <label htmlFor="site_name">Site Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="site_name"
                    name="site_name"
                    value={formData.site_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="domain">Domain</label>
                  <input
                    type="text"
                    className="form-control"
                    id="domain"
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="ip_address">IP Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ip_address"
                    name="ip_address"
                    value={formData.ip_address}
                    onChange={handleChange}
                    required
                  />
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

export default SitteManagementEditModle;