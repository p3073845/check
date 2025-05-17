import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { updateAdminMenuAction } from '../../redux/admin/AdminAction';

const AdminMenusListModal = ({ show, onClose, adminId, menuList = [] }) => {
    const dispatch = useDispatch();
    const [permissions, setPermissions] = useState({});
    const { loadingMenuUpdate, loadingMenu } = useSelector((state) => state.admin);
    console.log('loadingMenu', loadingMenu);

    useEffect(() => {
        const initialPermissions = {};
        menuList.forEach(menu => {
            // Set Dashboard (menu_id: 1) as true by default
            initialPermissions[menu.menu_id] = menu.menu_id === 1 ? true : menu.permission === "true";
        });
        setPermissions(initialPermissions);
    }, [menuList]);

    const handlePermissionChange = (menuId) => {
        setPermissions(prev => ({
            ...prev,
            [menuId]: !prev[menuId]
        }));
    };

    const handleSubmit = () => {
        const updatedPermissions = menuList.map(menu => ({
            menu_id: menu.menu_id,
            permission: menu.menu_id === 1 ? "true" : (permissions[menu.menu_id] || false).toString()
        }));
        console.log('updatedPermissions', updatedPermissions);
        dispatch(updateAdminMenuAction({
            payload: {
                admin_id: adminId,
                menu_data: updatedPermissions
            }
        }))
            .unwrap()
            .then((response) => {
                if (!response.error) {
                    toast.success(response.message, { toastId: `menu-update-success-${adminId}` });
                    onClose();
                }
            })
            .catch((error) => {
                toast.error(error.message || 'Failed to update menu permissions', {
                    toastId: `menu-update-error-${adminId}`
                });
            });
    };

    if (!show) return null;

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Admin Menu Permissions</h5>
                            <button type="button" className="close" onClick={onClose}>×</button>
                        </div>
                        {loadingMenu ?
                            <div className="modal-body">
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <p className="mt-2">Loading menu permissions...</p>
                                </div>
                            </div> :
                            <div className="modal-body">
                                <div className="list-group">
                                    {menuList.map((menu) => (
                                        <div key={menu.menu_id} className="list-group-item">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>{menu.name}</span>
                                                <div className="custom-control custom-switch">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id={`menu-${menu.menu_id}`}
                                                        checked={menu.menu_id === 1 ? true : (permissions[menu.menu_id] || false)}
                                                        onChange={() => menu.menu_id !== 1 && handlePermissionChange(menu.menu_id)}
                                                        disabled={menu.menu_id === 1}
                                                    />

                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor={`menu-${menu.menu_id}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                        <div className="modal-footer">

                     
                                
                                <>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-color"
                                        onClick={handleSubmit}
                                        disabled={loadingMenuUpdate}
                                    >
                                        {loadingMenuUpdate ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </>

                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default AdminMenusListModal;