import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  editUserAction,
  fetchUserListAction,
  updateStatusAction,
  changePasswordForusersAction
} from "../redux/users/userActions";
import PageHeader from "../components/commonFunc/PageHeader";
import DateRangePicker from "../components/DateRangePicker";
import moment from "moment";
import Pagination from "../components/commonFunc/Pagination";
import DeleteModal from "../components/modals/DeleteModal";
import ChangePasswordModal from "../components/modals/ChangePasswordModal";
import EditModal from "../components/modals/EditModal";
import { toast } from "react-toastify";

const ClientManagement = () => {
  const dispatch = useDispatch();
  const { loading, loadingStatusUpdates } = useSelector((state) => state.user);
  const users = useSelector((state) => state.user.users);
  const hasInitiallyFetched = useRef(false);

  // Modal states
  const [modalState, setModalState] = useState({
    showDeleteModal: false,
    deleteId: null,
    showPasswordModal: false,
    passwordClientId: null,
    showEditModal: false,
    editClientId: null,
  });

  const [filters, setFilters] = useState({
    searchQuery: "",
    from_date: moment().startOf('month'),
    to_date: moment(),
    currentPage: 1,
    limit: 10
  });
  console.log(filters, "filters");

  // Build params object for API calls
  const buildParams = useCallback((overrides = {}) => {
    const { from_date, to_date, searchQuery, currentPage, limit } = filters;

    return {
      limit,
      page: currentPage,
      search: searchQuery,
      from_date: moment(overrides.from_date || from_date).startOf("day").unix().toString(),
      to_date: moment(overrides.to_date || to_date).endOf("day").unix().toString(),
      ...overrides
    };
  }, [filters]);

  // Fetch users based on current filters
  const fetchUsers = useCallback(() => {
    dispatch(fetchUserListAction(buildParams()));
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

    if (query.length >= 2 || query.length === 0) {
      setFilters(prev => ({
        ...prev,
        searchQuery: query,
        currentPage: 1
      }));

      dispatch(fetchUserListAction(buildParams({
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
    console.log(from_date, to_date);
    setFilters(prev => ({
      ...prev,
      from_date,
      to_date,
      currentPage: 1
    }));

    dispatch(fetchUserListAction(buildParams({
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

    dispatch(fetchUserListAction(buildParams({ page: newPage })));
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
    const userId = modalState.deleteId;
    if (userId) {
      dispatch(deleteUserAction({ user_id: { user_id: userId } }))
        .unwrap()
        .then((response) => {
          if (response.error === false) {
            toast.success(response.message,
              {
                toastId: `user-delete-success-${response.message}`,
              }
            );
            fetchUsers();
          }
        })
        .catch((error) => {
          toast.error(error.message || 'Failed to delete user',
            {
              toastId: `user-delete-error-${error.message}`,
            }
          );
        })
        .finally(() => handleModalClose('Delete'));
    }
  }, [dispatch, modalState.deleteId, fetchUsers, handleModalClose]);

  const validateUserData = (userData) => {
    const validations = [
      {
        isValid: userData.name?.trim(),
        message: "Please enter a Client Name",
        id: 'client-name-required'
      },
      {
        isValid: userData.name?.length >= 2,
        message: "Client Name should be at least 2 characters long",
        id: 'client-name-length'
      },
      {
        isValid: /^[a-zA-Z ]{2,}$/.test(userData.name),
        message: "Please enter a valid Client Name without special characters and numbers",
        id: 'client-name-invalid'
      },
      {
        isValid: userData.email?.trim(),
        message: "Please enter an email address",
        id: 'client-email-required'
      },
      {
        isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email),
        message: "Please enter a valid email address",
        id: 'client-email-invalid'
      },
      {
        isValid: userData.status,
        message: "Please select a status",
        id: 'client-status-required'
      }
    ];

    for (const rule of validations) {
      if (!rule.isValid) {
        toast.error(rule.message, { toastId: rule.id });
        return false;
      }
    }
    return true;
  };

  // Edit user
  const handleEditUser = useCallback((userData) => {
    if (!validateUserData(userData)) return;

    const payload = {
      user_id: userData.user_id,
      name: userData.name.trim(),
      email: userData.email.trim(),
      status: userData.status
    };

    dispatch(editUserAction({ payload }))
      .unwrap()
      .then((response) => {
        if (!response.error && response.code === 0) {
          toast.success(response.message, { 
            toastId: `edit-client-success-${userData.user_id}` 
          });
          fetchUsers();
          handleModalClose('Edit');
        } else {
          throw new Error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to edit client', { 
          toastId: `edit-client-error-${userData.user_id}` 
        });
      });
  }, [dispatch, fetchUsers, handleModalClose]);

  // Update user status
  const handleStatusChange = useCallback((clientId, currentStatus) => {
    const newStatus = currentStatus === "1" ? "0" : "1";
    dispatch(updateStatusAction({
      payload: {
        id: clientId,
        status: newStatus
      }
    })).unwrap().then((response) => {
      if (response.error === false) {
        toast.success(response.message, {
          toastId: `status-update-success-${clientId}`
        });
      }
    }).catch((error) => {
      toast.error(error.message || 'Failed to update status', {
        toastId: `status-update-error-${clientId}`
      });
    })
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
                  name='searchQuery'
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
              to="/add-client"
              className="btn btn-color waves-effect waves-light"
              title="Add New Client"
            >
              <i className="fas fa-plus-square me-2" />
              <span className="ml-2">Add New Client</span>
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
                    <th>Client Name</th>
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
                        users?.data?.user_list?.map((client, index) => (
                          <tr key={client.id}>
                            <th scope="row">
                              {((filters.currentPage - 1) * filters.limit) + index + 1}
                            </th>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.declared_date}</td>
                            <td>
                              <label
                                className={`switch custom_switch ${loadingStatusUpdates[client.id] ? "disabled" : ""}`}
                                style={{
                                  opacity: loadingStatusUpdates[client.id] ? 0.5 : 1,
                                  cursor: loadingStatusUpdates[client.id] ? "not-allowed" : "pointer",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  defaultChecked={client.status === "1"}
                                  onChange={() => handleStatusChange(client.id, client.status)}
                                  disabled={loadingStatusUpdates[client.id]}
                                />
                                <span className="slider round" />
                              </label>
                            </td>
                            <td>
                              <div className="Actionbtn_table">
                                <button
                                  className="btn waves-effect waves-light btn-purple"
                                  title="Edit"
                                  onClick={() => handleModalAction('Edit', client.id)}
                                >
                                  <i className="mdi mdi-account-edit-outline" />
                                </button>
                                <button
                                  type="button"
                                  className="btn waves-effect waves-light btn-danger"
                                  title="Delete"
                                  onClick={() => handleModalAction('Delete', client.id)}
                                >
                                  <i className="mdi mdi-delete-alert" />
                                </button>
                                <button
                                  type="button"
                                  className="btn waves-effect waves-light btn-success change_password"
                                  title="Change Password"
                                  style={{ padding: "0px 11px 0px 10px" }}
                                  onClick={() => handleModalAction('Password', client.id)}
                                >
                                  <i className="ion ion-md-unlock" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No clients found...
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
        apiAction={changePasswordForusersAction}
      />

      <EditModal
        show={modalState.showEditModal}
        onClose={() => handleModalClose('Edit')}
        clientId={modalState.editClientId}
        onEdit={handleEditUser}
        userData={users?.data?.user_list}
        modalType="Client"
      />
    </div>
  );
};

export default ClientManagement;