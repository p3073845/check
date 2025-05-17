import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
   adminDeleteAction, 
  adminPasswordUpdateAction,
  adminListAction, 
  adminStatusUpdateAction,
  editAdminAction,
  adminMenusListAction
} from "../redux/admin/AdminAction";
import { updateStatusPending, updateStatusFulfilled, updateStatusRejected } from "../redux/admin/AdminSlice";
import PageHeader from "../components/commonFunc/PageHeader";
import DateRangePicker from "../components/DateRangePicker";
import moment from "moment";
import Pagination from "../components/commonFunc/Pagination";
import DeleteModal from "../components/modals/DeleteModal";
import ChangePasswordModal from "../components/modals/ChangePasswordModal";
import EditModal from "../components/modals/EditModal";
import AdminMenusListModal from "../components/modals/AdminMenusListModal";
import { toast } from "react-toastify";
const AdminManagement = () => {
  const dispatch = useDispatch();
  const { loading, loadingStatusUpdates } = useSelector((state) => state.admin);
  const users = useSelector((state) => state.admin.admin);
  const hasInitiallyFetched = useRef(false);

  // Modal states
  const [modalState, setModalState] = useState({
    showDeleteModal: false,
    deleteId: null,
    showPasswordModal: false,
    passwordClientId: null,
    showEditModal: false,
    editClientId: null,
    showAdminMenusListModal: false,
    adminMenusListId: null,
  });

  const [filters, setFilters] = useState({
    searchQuery: "",
    from_date: moment().startOf('month'),
    to_date: moment(),
    currentPage: 1,
    limit: 10
  });

  const [menuList, setMenuList] = useState([]);

  // Build params object for API calls
  const buildParams = useCallback((overrides = {}) => {
    const { from_date, to_date, searchQuery, currentPage, limit } = filters;
   
    return {
      limit,
      page: currentPage,
      search: searchQuery,
      from_date: moment(overrides.from_date || from_date) .startOf("day").unix().toString(),
      to_date: moment(overrides.to_date || to_date) .endOf("day") .unix().toString(),
      ...overrides
    };
  }, [filters]);

  // Fetch users based on current filters
  const fetchUsers = useCallback(() => {
    dispatch(adminListAction(buildParams()));
  }, [dispatch, buildParams]);

  // Initial data fetch
  useEffect(() => {
    if (!hasInitiallyFetched.current) {
      fetchUsers();
      hasInitiallyFetched.current = true;
    }
  }, [fetchUsers]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    
    // Only update filters and fetch data if query is empty or at least 2 characters
    if (query.length >= 2 || query.length === 0) {
      setFilters(prev => ({
        ...prev,
        searchQuery: query,
        currentPage: 1  
      }));
      
      dispatch(adminListAction(buildParams({ 
        search: query, 
        page: 1 
      })));
    } else {
      setFilters(prev => ({
        ...prev,
        searchQuery: query
      }));
    }
  };

  // Handle date range changes
  const handleDateRangeChange = useCallback((start, end) => {
    const from_date = start || moment().startOf('month');
    const to_date = end || moment();
    setFilters(prev => ({
      ...prev,
      from_date,
      to_date,
      currentPage: 1
    }));
    
    dispatch(adminListAction(buildParams({ 
      from_date: (from_date ? moment(from_date).startOf('day').unix() : moment().startOf('month').unix()).toString(),
      to_date: (to_date ? moment(to_date).endOf('day').unix() : moment().endOf('day').unix()).toString(),
      page: 1 
    })));
  }, [dispatch, buildParams]);



  // Handle pagination
  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      currentPage: newPage
    }));
    
    dispatch(adminListAction(buildParams({ page: newPage })));
  };

  // Modal actions
  const handleModalAction = useCallback((modalType, id = null) => {
    setModalState(prev => ({
      ...prev,
      [`show${modalType}Modal`]: true,
      passwordClientId: modalType === 'Password' ? id : prev.passwordClientId,
      deleteId: modalType === 'Delete' ? id : prev.deleteId,
      editClientId: modalType === 'Edit' ? id : prev.editClientId
    }));
  }, []);

  const handleModalClose = useCallback((modalType) => {
    setModalState(prev => ({
      ...prev,
      [`show${modalType}Modal`]: false,
      passwordClientId: modalType === 'Password' ? null : prev.passwordClientId,
      deleteId: modalType === 'Delete' ? null : prev.deleteId,
      editClientId: modalType === 'Edit' ? null : prev.editClientId
    }));
  }, []);

  // Delete user
  const handleDeleteConfirm = useCallback(() => {
    const admin_id = modalState.deleteId;
    if (admin_id) {
      dispatch(adminDeleteAction({ admin_id: { admin_id } }))
        .unwrap()
        .then((response) => {
          if (response.error === false) {
            toast.success(response.message,
              {
                toastId: `delete-admin-success-${admin_id}`,
              }
            );
            fetchUsers();
          }
        })
        .catch((error) => {
          toast.error(error.message || 'Failed to delete user', {
            toastId: 'delete-admin-error'
          });
        })
        .finally(() => handleModalClose('Delete'));
    }
  }, [dispatch, modalState.deleteId, fetchUsers, handleModalClose]);

const handleEditUser = useCallback((userData) => {
  const nameRegex = /^[a-zA-Z ]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validations = [
    {
      isInvalid: !userData.name,
      message: "Please enter an Admin Name",
      toastId: 'admin-name-error',
    },
    {
      isInvalid: userData.name && userData.name.length < 2,
      message: "Admin Name should be at least 2 characters long",
      toastId: 'admin-name-length-error',
    },
    {
      isInvalid: userData.name && !nameRegex.test(userData.name),
      message: "Please enter a valid Admin Name without special characters or numbers",
      toastId: 'admin-name-invalid-error',
    },
    {
      isInvalid: !emailRegex.test(userData.email),
      message: "Please enter a valid email address",
      toastId: 'admin-email-error',
    },
    {
      isInvalid: !userData.status,
      message: "Please select a status",
      toastId: 'admin-status-error',
    },
  ];

  for (const { isInvalid, message, toastId } of validations) {
    if (isInvalid) {
      toast.error(message, { toastId });
      return;
    }
  }

  dispatch(editAdminAction({
    payload: {
      admin_id: userData.user_id,
      name: userData.name,
      email: userData.email,
      status: userData.status,
    }
  }))
    .unwrap()
    .then((response) => {
      if (!response.error && response.code === 0) {
        toast.success(response.message,
          {
            toastId: `edit-admin-success-${userData.user_id}`,
          }
        );
        fetchUsers();
        handleModalClose('Edit');
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });

}, [dispatch, fetchUsers, handleModalClose]);


  // Update user status
  const handleStatusChange = useCallback((adminId, currentStatus) => {
    const newStatus = currentStatus === "1" ? "0" : "1";
    const payload = {
      id: adminId,
      status: newStatus
    };

    // Set loading state
    dispatch(updateStatusPending({ id: adminId }));

    dispatch(adminStatusUpdateAction({payload}))
      .unwrap()
      .then((response) => {
        if (!response.error) {
          dispatch(updateStatusFulfilled({ id: adminId, status: newStatus }));
          toast.success(response.message, {
            toastId: `status-update-success-${adminId}`
          });
        } else {
          dispatch(updateStatusRejected({ id: adminId }));
          toast.error(response.message, {
            toastId: `status-update-error-${adminId}`
          });
        }
      })
      .catch((error) => {
        dispatch(updateStatusRejected({ id: adminId }));
        toast.error(error.message || 'Failed to update status', {
          toastId: `status-update-error-${adminId}`
        });
      });
  }, [dispatch]);

  const handleAdminMenusList = useCallback((adminId) => {
    setModalState(prev => ({
      ...prev,
      showAdminMenusListModal: true,
      adminMenusListId: adminId
    }));

    dispatch(adminMenusListAction({ admin_id: adminId }))
      .unwrap()
      .then((response) => {
        if (!response.error) {
          setMenuList(response.data || []);
        } else {
          toast.error(response.message, { toastId: `menu-fetch-error-${adminId}` });
        }
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to fetch menus list', {
          toastId: `admin-menus-error-${adminId}`
        });
      });
  }, [dispatch]);


  return (
    <div>
      <PageHeader />

      <div className="main_card">
        {/* Filter section */}
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="form-group">
              <label htmlFor="dateRange">Date Range</label>
              <DateRangePicker
                id="dateRange"
                startDate={filters.from_date}
                endDate={filters.to_date}
                onDateSelect={handleDateRangeChange}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="app-search-box">
                     <label htmlFor="dateRange">Search</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or email..."
                    value={filters.searchQuery}
                    onChange={handleSearchChange}
                    aria-label="Search clients"
            
                  />
                  <div className="input-group-append">
                    <button className="btn" type="submit">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12  col-sm-12 addclient  mb-3">
            <Link
              to="/add-admin"
              className="btn btn-color waves-effect waves-light"
              title="Add New Client"
            >
              <i className="fas fa-plus-square me-2" />
              <span className="ml-2">Add New Admin</span>
            </Link>
          </div>
        </div>
        
        <div className="row">
          {/* Clients Table */}
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Admin Name</th>
                    <th>Email Id</th>
                    <th>Create Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="" style={{ height: '60vh' }}>
                        <div className="table_loader">
                          <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {users?.data?.user_list?.length > 0 ? (
                        users.data.user_list.map((admin, index) => (
                          <tr key={admin.id}>
                            <th scope="row">{((filters.currentPage - 1) * filters.limit) + index + 1}</th>
                            <td>{admin.name}</td>
                            <td>{admin.email}</td>
                            <td>{admin.declared_date}</td>
                            <td>
                              <label
                                className={`switch custom_switch ${loadingStatusUpdates[admin.id] ? "disabled" : ""}`}
                                style={{
                                  opacity: loadingStatusUpdates[admin.id] ? 0.5 : 1,
                                  cursor: loadingStatusUpdates[admin.id] ? "not-allowed" : "pointer",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  defaultChecked={admin.status === "1"}
                                  onChange={() => handleStatusChange(admin.id, admin.status)}
                                  disabled={loadingStatusUpdates[admin.id]}
                                />
                                <span className="slider round" />
                              </label>
                            </td>
                            <td>
                              <div className="Actionbtn_table">
                                <button
                                  className="btn waves-effect waves-light btn-purple"
                                  title="Edit"
                                  onClick={() => handleModalAction('Edit', admin.id)}
                                >
                                  <i className="mdi mdi-account-edit-outline" />
                                </button>
                                <button
                                  type="button"
                                  className="btn waves-effect waves-light btn-danger"
                                  title="Delete"
                                  onClick={() => handleModalAction('Delete', admin.id)}
                                >
                                  <i className="mdi mdi-delete-alert" />
                                </button>
                                <button
                                  type="button"
                                  className="btn waves-effect waves-light btn-success change_password"
                                  title="Change Password"
                                  style={{ padding: "0px 11px 0px 10px" }}
                                  onClick={() => handleModalAction('Password', admin.id)}
                                >
                                  <i className="ion ion-md-unlock" />
                                </button>
                                <button
                                  type="button"
                                  className="btn waves-effect waves-light btn-primary"
                                  title="Admin Menus List"
                                  onClick={() => handleAdminMenusList(admin.id)}
                                >
                                  <i className="mdi mdi-account-key" />
                                </button>

                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No Record found...
                          </td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            
            <Pagination
              currentPage={filters.currentPage}
              totalItems={users?.data?.total_count || 0}
              itemsPerPage={filters.limit}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <DeleteModal
        show={modalState.showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={() => handleModalClose('Delete')}
      />

      <ChangePasswordModal
        show={modalState.showPasswordModal}
        onClose={() => handleModalClose('Password')}
        clientId={modalState.passwordClientId}
        apiAction={adminPasswordUpdateAction}
      />

      <EditModal
        show={modalState.showEditModal}
        onClose={() => handleModalClose('Edit')}
        clientId={modalState.editClientId}
        onEdit={handleEditUser}
        userData={users?.data?.user_list}
        modalType="Admin"
      />

      <AdminMenusListModal
        show={modalState.showAdminMenusListModal}
        onClose={() => handleModalClose('AdminMenusList')}
        adminId={modalState.adminMenusListId}
        menuList={menuList}
      />
    </div>
  );
};

export default AdminManagement;