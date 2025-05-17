import React, { useCallback, useState } from 'react';
import PageHeader from "../components/commonFunc/PageHeader";
import { addSiteAction, userNameListAction } from '../redux/site/SitesAction';
import BootstrapDropDown from '../components/commonFunc/BootstrapDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AddSite = () => {
  const { clientNameLoading, loading } = useSelector((state) => state.site);
  const [clientList, setClientList] = useState([]);
  const [formData, setFormData] = useState({
    client_id: null,
    clientName: '',
    site_name: '',
    domain: '',
    ip_address: '',
    unique_key: '',
    status: ''
  });

  const dispatch = useDispatch();

  // Fetch client names with search - only on dropdown open
  const fetchClientNames = useCallback((search = "") => {
    dispatch(userNameListAction({ search }))
      .unwrap()
      .then((response) => {
        if (!response.error && response.data?.user_list) {
          const options = response.data.user_list.map((client) => ({
            value: client.user_id,
            label: client.name,
          }));
          setClientList(options);
        } else {
          setClientList([]);
        }
      })
      .catch(() => {
        setClientList([]);
      });
  }, [dispatch]);

  const handleClientChange = useCallback(
    (option) => {
      setFormData(prev => ({
        ...prev,
        client_id: option ? option.value : null,
        clientName: option ? option.label : ''
      }));
    }, []
  );

  const handleClientSearch = useCallback((searchText) => {
    if (searchText && searchText.length >= 2) {
      fetchClientNames(searchText);
    }
  }, [fetchClientNames]);

  const generateKey1 = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 14;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData(prev => ({
      ...prev,
      unique_key: result
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic required field validation
    if (!formData.client_id) {
      toast.error("Please select a Client Name", { toastId: 'site-client-required' });
      return;
    }

    if (!formData.site_name) {
      toast.error("Please enter a Site Name", { toastId: 'site-name-required' });
      return;
    }

    // Site name validation - requires at least one letter
    const siteNameRegex = /^[a-zA-Z0-9]+$/;

    if (!siteNameRegex.test(formData.site_name)) {
      toast.error("Please enter a valid Site Name", { toastId: 'site-name-invalid' });
      return;
    }

    if (!formData.domain) {
      toast.error("Please enter a Domain", { toastId: 'site-domain-required' });
      return;
    }

    // Domain validation
    const domainRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{1,63}(?<!-)$/;

    if (!domainRegex.test(formData.domain)) {
      toast.error("Please enter a valid domain name (e.g., example.com)", { toastId: 'site-domain-invalid' });
      return;
    }

    if (!formData.ip_address) {
      toast.error("Please enter IP's", { toastId: 'site-ip-required' });
      return;
    }

    // IP address validation
    // This handles both single IP and comma-separated IPs
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (!ipRegex.test(formData.ip_address)) {
      toast.error("Please enter a valid IP address", { toastId: 'site-ip-invalid' });
      return;
    }



    if (!formData.unique_key) {
      toast.error("Please generate a key", { toastId: 'site-key-required' });
      return;
    }

    // Adjust this regex based on your key format requirements
    const keyRegex = /^[a-zA-Z0-9]{16}$/;
    if (!keyRegex.test(formData.unique_key)) {
      toast.error("Invalid key format. Please generate a new key", { toastId: 'site-key-invalid' });
      return;
    }

    if (!formData.status) {
      toast.error("Please select a Status", { toastId: 'site-status-required' });
      return;
    }
    const { client_id, site_name, domain, ip_address, unique_key, status } = formData;

    const siteData = {
      client_id,
      site_name,
      domain,
      ip_address,
      unique_key,
      status
    };

    // Dispatch the action through Redux
    dispatch(addSiteAction({ siteData }))
      .unwrap()
      .then(response => {
        console.log("response", response);
        if (response.code === 0 && response.error === false) {
          toast.success(response.message, { toastId: 'site-add-success' });
          handleReset();
        }
      })
      .catch(error => {
        console.error("Error adding site:", error);
        toast.error("Error adding site", { toastId: 'site-add-error' });
      });
  };

  // Function to generate a unique key
  const generateKey = () => {
    // Generate a random string of 16 uppercase characters
    const randomString = Array(16)
      .fill('')
      .map(() => Math.random().toString(36).charAt(2).toUpperCase())
      .join('');

    // Set the generated key in form data
    setFormData({
      ...formData,
      unique_key: randomString
    });

    toast.success("Unique key generated successfully");
  };


  const handleReset = () => {
    setFormData({
      client_id: null,
      clientName: '',
      site_name: '',
      domain: '',
      ip_address: '',
      unique_key: '',
      status: ''
    });
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div class="page-title-box">
        <div class="page-title-right">
          <ol class="breadcrumb m-0">
            <li class="breadcrumb-item">
              <Link to='/'> 2FA</Link>
            </li>
            <li class="breadcrumb-item active">
              <Link to='/site-management'>Site Management</Link>
            </li>
            <li class="breadcrumb-item active">Add Site</li>
          </ol>
        </div>
        <h4 class="page-title">Add Site</h4>
      </div>
      <div className="main_card">
        <div className="row">
          <div className="col-lg-12">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-4 col-sm-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="clientName">Client Name</label>
                      <BootstrapDropDown
                        id="clientName"
                        options={clientList}
                        value={clientList.find(
                          (option) => option.value === formData.client_id
                        )}
                        onChange={handleClientChange}
                        placeholder="Select Client"
                        onMenuOpen={() => !clientList.length && fetchClientNames()}
                        onSearch={(searchText) => searchText.length >= 2 && handleClientSearch(searchText)}
                        isLoading={clientNameLoading}
                        isSearching={clientNameLoading}
                        loadingMessage="Loading..."
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6 mb-3">
                    <label className="form-label">Site Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Site Name"
                      name="site_name"
                      value={formData.site_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-lg-4 col-sm-6 mb-3">
                    <label className="form-label">Domain</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Domain"
                      name="domain"
                      value={formData.domain}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-lg-4 col-sm-6 mb-3">
                    <label className="form-label">IP's</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter IP's"
                      name="ip_address"
                      value={formData.ip_address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-lg-4 col-sm-6 mb-3">
                    <label className="form-label">key Generate</label>
                    <div className="Generated_relative">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter key"
                        name="unique_key"
                        readOnly
                        value={formData.unique_key}
                        onChange={handleChange}
                      />
                      <div
                        className="Generated_btn"
                        onClick={generateKey}
                        style={{ cursor: 'pointer' }}
                      >
                        Generate
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6 mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-control"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="mt-2"> 
                  {loading ? 
                  <button type="submit" className="btn btn-color" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                  </button> :
                  <button type="submit" className="btn btn-color">
                    Submit
                  </button>
                  }
                  <button type="button" className="btn btn-secondary ms-2 ml-2" onClick={handleReset}>
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSite;