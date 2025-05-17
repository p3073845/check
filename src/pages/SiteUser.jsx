import React, { useState, useCallback } from "react";
import PageHeader from "../components/commonFunc/PageHeader";
import JsonModal from "../components/modals/JsonModal";
import DateRangePicker from '../components/DateRangePicker';
import { userNameListAction, siteNameListAction } from "../redux/site/SitesAction";
import BootstrapDropDown from "../components/commonFunc/BootstrapDropDown";
import { useDispatch } from "react-redux";
const SiteUser = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filters, setFilters] = useState({
    searchQuery: "",
    client_id: null,
    site_id: null,
    from_date: moment().startOf('month').unix().toString(),
    to_date: moment().endOf('day').unix().toString(),
    page: 1,
    limit: 10,
  });
  const handleDateRangeChange = React.useCallback((start, end) => {
    setStartDate(start);
    setEndDate(end);
  }, []);

  // States for dropdown options
  const [clientList, setClientList] = useState([]);
  const [siteList, setSiteList] = useState([]);

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
  }, []);

  // Fetch site names based on client
  const fetchSiteNames = useCallback((clientId) => {
    if (!clientId) return;

    dispatch(
      siteNameListAction({
        search: "",
        client_id: clientId,
      })
    )
      .unwrap()
      .then((response) => {
        console.log("Site names response:", response);
        if (!response.error && response.data?.site_list) {
          const options = response.data.site_list.map((site) => ({
            value: site.site_id,
            label: site.siteName,
          }));
          setSiteList(options);
        } else {
          setSiteList([]);
        }
      })
      .catch(() => {
        setSiteList([]);
      });
  }, [dispatch]);

  const handleClientChange = useCallback(
    (option) => {
      setFilters((prev) => ({
        ...prev,
        client_id: option ? option.value : null,
        site_id: null,
        page: 1,
      }));

      if (option?.value) {
        // Only fetch sites when a client is selected
        fetchSiteNames(option.value);
      } else {
        setSiteList([]);
      }

      // Reset site selection when client changes
      setFilters(prev => ({
        ...prev,
        site_id: null
      }));
    },
    [fetchSiteNames]
  );

  const handleClientSearch = useCallback((searchText) => {
    if (searchText && searchText.length >= 2) {
      fetchClientNames(searchText);
    }
  }, [fetchClientNames]);

  const handleSiteChange = useCallback((option) => {
    setFilters((prev) => ({
      ...prev,
      site_id: option ? option.value : null,
      page: 1,
    }));
  }, []);
  return (
    <div>
      <PageHeader />
      <div className="main_card">

        <div className="row mb-3">
          <div className=" col-md-4  col-sm-6">
            <div className="form-group">
              <label htmlFor="clientName">Client Name</label>
              <BootstrapDropDown
                id="clientName"
                options={clientList}
                value={clientList.find(
                  (option) => option.value === filters.client_id
                )}
                onChange={handleClientChange}
                placeholder="Select Client"
                onMenuOpen={() => !clientList.length && fetchClientNames()}
                onSearch={(searchText) => searchText.length >= 2 && handleClientSearch(searchText)}
              // isLoading={loading}
              />
            </div>
          </div>
          <div className=" col-md-4 col-sm-6">
             <div className="form-group">
                <label htmlFor="siteName">Site Name</label>
                <BootstrapDropDown
                  id="siteName"
                  options={siteList}
                  value={siteList.find(
                    (option) => option.value === filters.site_id
                  )}
                  onChange={handleSiteChange}
                  placeholder="Select Site"
                  // isLoading={loading}
                  disabled={!filters.client_id}
                />
              </div>
          </div>

          <div className=" col-md-4 col-sm-6">
            <div className="form-group">
              <label htmlFor="">Device Type</label>
              <select id className="form-control">
                <option>Select Device</option>
                <option>Event Type 1</option>
                <option>Event Type 2</option>
              </select>
            </div>
          </div>

          <div className=" col-md-4 col-sm-6">
            <div className="app-search-box">
              <label htmlFor>Search</label>
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
          </div>
          <div className=" col-md-4 col-sm-6">
            <div className="form-group">
              <label>Date Range</label>
              <DateRangePicker
                onDateSelect={handleDateRangeChange}

              />
            </div>
          </div>

          <div className="col-lg-2 col-md-3 d-flex align-items-center mt-2">
            <button type="submit" className="btn btn-color ">
              Submit
            </button>
            <button type="reset" className="btn btn-secondary reset_btnbox ml-2">
              Reset
            </button>
          </div>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-bordered custom-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Client Name</th>
                <th>Site Name</th>
                <th>User</th>
                <th>Device Id</th>
                <th>Device Type</th>
                <th>Last used</th>
                <th>Action</th>
                <th>Remove 2FA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Raj</td>
                <td>Google</td>
                <td>Demo 1</td>
                <td>5685</td>
                <td>IOS</td>
                <td>8 April 2025</td>
                <td>
                  <label className="switch custom_switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <div className="custom-checkbox-wrapper">
                    <input
                      type="checkbox"
                      id={`checkbox-1`}
                      className="custom-checkbox-input"
                    />
                    <label
                      className="custom-checkbox-label"
                      htmlFor={`checkbox-1`}
                    ></label>
                  </div>
                </td>
              </tr>

              <tr>
                <th scope="row">2</th>
                <td>Raj</td>
                <td>Google</td>
                <td>Demo 2</td>
                <td>5685</td>
                <td>App</td>
                <td>8 April 2025</td>
                <td>
                  <label className="switch custom_switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <div className="custom-checkbox-wrapper">
                    <input
                      type="checkbox"
                      id={`checkbox-2`}
                      className="custom-checkbox-input"
                    />
                    <label
                      className="custom-checkbox-label"
                      htmlFor={`checkbox-2`}
                    ></label>
                  </div>
                </td>
              </tr>

              {/* Add more rows with the same structure */}
            </tbody>
          </table>
        </div>
      </div>
      <JsonModal
        show={showModal}
        onClose={() => setShowModal(false)}
        data={modalData}
      />
    </div>
  );
};

export default SiteUser;
