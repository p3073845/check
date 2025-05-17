import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/commonFunc/PageHeader";
import DateRangePicker from "../components/DateRangePicker";
import DeleteModal from "../components/modals/DeleteModal";
import SitteManagementEditModle from "../components/modals/SitteManagementEditModle";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import BootstrapDropDown from "../components/commonFunc/BootstrapDropDown";
import moment from "moment";
import { fetchSiteListAction, userNameListAction, siteNameListAction, siteStatusUpdateAction, siteDeleteAction } from "../redux/site/SitesAction";
import Pagination from "../components/commonFunc/Pagination";

const SiteManagement = () => {
  const dispatch = useDispatch();
  const siteDate = useSelector((state) => state.site.sites);
  const { loadingStatusUpdates, loading, clientNameLoading } = useSelector((state) => state.site);
  const hasInitiallyFetched = useRef(false);
  const clientNamesRef = useRef(false); 
  const [modalState, setModalState] = useState({
    showDeleteModal: false,
    deleteId: null,
    showEditModal: false,
    editSiteId: null,
  });

  const [filters, setFilters] = useState({
    searchQuery: "",
    client_id: null,
    site_id: null,
    from_date: moment().startOf('month').unix().toString(),
    to_date: moment().endOf('day').unix().toString(),
    page: 1,
    limit: 10,
  });

  // States for dropdown options
  const [clientList, setClientList] = useState([]);
  const [siteList, setSiteList] = useState([]);
  const [isClientMenuOpen, setIsClientMenuOpen] = useState(false); // Track menu open state

  const fetchSites = useCallback(() => {
    dispatch(
      fetchSiteListAction({
        limit: filters.limit,
        page: filters.page,
        search: filters.searchQuery,
        from_date: filters.from_date,
        to_date: filters.to_date,
        client_id: filters.client_id,
        site_id: filters.site_id,
      })
    ).unwrap();
  }, [dispatch, filters]);

  useEffect(() => {
    if (!hasInitiallyFetched.current) {
      fetchSites();
      hasInitiallyFetched.current = true;
    }
  }, [fetchSites]);

  // Fetch client names with search - only on dropdown open
  const fetchClientNames = useCallback((search = "") => {
   
    if (!clientNamesRef.current || search) {
      dispatch(userNameListAction({ search }))
        .unwrap()
        .then((response) => {
          if (!response.error && response.data?.user_list) {
            const options = response.data.user_list.map((client) => ({
              value: client.user_id,
              label: client.name,
            }));
            setClientList(options);
            if (!search) {
              clientNamesRef.current = true;
            }
          } else {
            setClientList([]);
          }
        })
        .catch(() => {
          setClientList([]);
        });
    }
  }, [dispatch]);

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
    },
    [fetchSiteNames]
  );

  const handleClientSearch = useCallback((searchText) => {
    if (searchText && searchText.length >= 2) {
      fetchClientNames(searchText);
    }
  }, [fetchClientNames]);

  const handleClientMenuOpen = useCallback(() => {
    if (!isClientMenuOpen && !clientList.length) {
      setIsClientMenuOpen(true);
      fetchClientNames();
    }
  }, [fetchClientNames, clientList.length, isClientMenuOpen]);

  const handleClientMenuClose = useCallback(() => {
    setIsClientMenuOpen(false);
  }, []);

  const handleSiteChange = useCallback((option) => {
    setFilters((prev) => ({
      ...prev,
      site_id: option ? option.value : null,
      page: 1,
    }));
  }, []);

  const handleDateRangeChange = useCallback((start, end) => {
    setFilters((prev) => ({
      ...prev,
      from_date: start ? moment(start).startOf("day").unix().toString() : "",
      to_date: end ? moment(end).endOf("day").unix().toString() : "",
      page: 1,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      fetchSites();
    },
    [fetchSites]
  );

  const handleInputChange = useCallback(
    (e) => {
      const query = e.target.value;
      setFilters((prev) => ({
        ...prev,
        searchQuery: query,
        page: 1,
      }));

      // Only perform search if query length is appropriate
      if (query.length >= 2 || query.length === 0) {
        dispatch(fetchSiteListAction({
          limit: 10,
          page: 1,
          search: query,
          from_date: filters.from_date,
          to_date: filters.to_date,
          client_id: filters.client_id,
          site_id: filters.site_id,
        }));
      }
    },
    [dispatch, filters.from_date, filters.to_date, filters.client_id, filters.site_id]
  );

  const handleSearch = useCallback(() => {
    if (filters.searchQuery.length >= 2 || filters.searchQuery.length === 0) {
      fetchSites();
    }
  }, [fetchSites, filters.searchQuery]);

  // handle site status update
  const handleSiteStatusUpdate = useCallback(
    (siteId, currentStatus) => {
      const siteData = {
        site_id: siteId,
        status: currentStatus === "1" ? "0" : "1"
      };
      dispatch(siteStatusUpdateAction({ siteData }))
        .unwrap()
        .then((response) => {
          if (!response.error) {
            toast.success(response.message, {
              toastId: `site-status-success-${siteId}`
            });
          }
        });
    }, [dispatch]);

  const handleDeleteClick = useCallback((id) => {
    setModalState((prev) => ({
      ...prev,
      showDeleteModal: true,
      deleteId: id,
    }));
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    const site_id = modalState.deleteId;
    if (site_id) {
      dispatch(siteDeleteAction({
        siteData: {
          site_id
        }
      }))
        .unwrap()
        .then((response) => {
          if (!response.error) {
            toast.success(response.message, {
              toastId: `site-delete-success-${site_id}`
            });
            fetchSites();
          }
        })
        .catch((error) => {
          toast.error(error.message || "Failed to delete site", {
            toastId: `site-delete-error-${site_id}`
          });
        })
        .finally(() => {
          setModalState((prev) => ({
            ...prev,
            showDeleteModal: false,
            deleteId: null,
          }));
        });
    }
  }, [dispatch, modalState.deleteId, fetchSites]);

  const handleDeleteCancel = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      showDeleteModal: false,
      deleteId: null,
    }));
  }, []);

  const handleEditClick = useCallback((id) => {
    setModalState((prev) => ({
      ...prev,
      showEditModal: true,
      editSiteId: id,
    }));
  }, []);

  const handleEditClose = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      showEditModal: false,
      editSiteId: null,
    }));
  }, []);

  const handleEditSite = useCallback(() => {
    handleEditClose();
    fetchSites();
  }, [fetchSites, handleEditClose]);

  const handleReset = useCallback(() => {
    const defaultStartDate = moment().startOf('month').unix().toString();
    const defaultEndDate = moment().endOf('day').unix().toString();

    setFilters(prev => ({
      ...prev,
      searchQuery: "",
      search: "",
      client_id: null,
      site_id: null,
      from_date: defaultStartDate,
      to_date: defaultEndDate,
      page: 1,
      limit: 10,
    }));
    setSiteList([]);

    // Force a fetch with reset filters
    dispatch(fetchSiteListAction({
      limit: 10,
      page: 1,
      search: "",
      from_date: defaultStartDate,
      to_date: defaultEndDate,
      client_id: null,
      site_id: null,
    }));
  }, [dispatch]);

  // Handle page change
  const handlePageChange = useCallback((newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
    
    dispatch(fetchSiteListAction({
      limit: filters.limit,
      page: newPage,
      search: filters.searchQuery,
      from_date: filters.from_date,
      to_date: filters.to_date,
      client_id: filters.client_id,
      site_id: filters.site_id,
    }));
  }, [dispatch, filters.limit, filters.searchQuery, filters.from_date, filters.to_date, filters.client_id, filters.site_id]);

  return (
    <div>
      <PageHeader />
      <div className="main_card">
        {/* Filter Form */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
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
                  onMenuOpen={handleClientMenuOpen}
                  onMenuClose={handleClientMenuClose}
                  onSearch={handleClientSearch}
                  isLoading={clientNameLoading}
                  isSearching={clientNameLoading}
                  loadingMessage="Loading..."
                />
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
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
  disabled={!filters.client_id || siteList.length === 0}
/>

              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
              <div className="form-group">
                <label>Date Range</label>
                <DateRangePicker
                  onDateSelect={handleDateRangeChange}
                  startDate={moment.unix(filters.from_date)}
                  endDate={moment.unix(filters.to_date)}
                />
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 mb-3">
              <div className="app-search-box">
                <label htmlFor="siteName">Search</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    name="searchQuery"
                    value={filters.searchQuery}
                    onChange={handleInputChange}
                  />
                  <div className="input-group-append">
                    <button className="btn" type="button" onClick={handleSearch}>
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 mt-md-4 mt-xl-0 mb-3">
              <div className="mt-md-1">
                <button
                  type="submit"
                  className="btn btn-color sitebtn"
                >
                  Submit
                </button>
                <button 
                  type='button'
                  className="btn btn-secondary ml-3 sitebtn"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Search and Add Site Section */}
        <div className="row">
          <div className="col-lg-12 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/add-site" className="btn btn-color" style={{ position: 'relative', zIndex: 1 }}>
                <i className="fas fa-plus-square mr-1"></i>
                Add Site
              </Link>
            </div>
          </div>
        </div>

        {/* Sites Table */}
        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Client Name</th>
                    <th>Site Name</th>
                    <th>Domain</th>
                    <th>IP's</th>
                    <th>Site Key</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="" style={{ height: '60vh' }}>
                        <div className="table_loader">
                          <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : !siteDate?.data?.site_list?.length ? (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    siteDate.data.site_list.map((item, index) => (
                      <tr key={item.site_id}>
                        <th scope="row">{((filters.page - 1) * filters.limit) + index + 1}</th>
                        <td>{item.client_name}</td>
                        <td>{item.siteName}</td>
                        <td>{item.domain}</td>
                        <td>{item.ip}</td>
                        <td>{item.siteSecretKey}</td>
                        <td>
                          <label className="switch custom_switch">
                            <input
                              type="checkbox"
                              defaultChecked={item.status === "1"}
                              onChange={() => handleSiteStatusUpdate(item.site_id, item.status)}
                              disabled={loadingStatusUpdates[item.site_id]}
                            />
                            <span className="slider round" />
                          </label>
                        </td>
                        <td>
                          <div className="Actionbtn_table">
                            <button
                              className="btn waves-effect waves-light btn-purple"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Edit"
                              onClick={() => handleEditClick(item.site_id)}
                            >
                              <i className="mdi mdi-account-edit-outline" />
                            </button>
                            <button
                              type="button"
                              className="btn waves-effect waves-light btn-danger"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              onClick={() => handleDeleteClick(item.site_id)}
                            >
                              <i className="mdi mdi-delete-alert" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {siteDate?.data?.site_list?.length > 0 && (
              <Pagination
                currentPage={filters.page}
                totalItems={siteDate?.data?.total_count || 0}
                itemsPerPage={filters.limit}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
      <DeleteModal
        show={modalState.showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
      <SitteManagementEditModle
        show={modalState.showEditModal}
        onClose={handleEditClose}
        siteId={modalState.editSiteId}
        onEdit={handleEditSite}
      />
    </div>
  );
};

export default SiteManagement;