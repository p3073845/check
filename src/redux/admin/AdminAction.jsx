import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeApiCall } from '../../utils/ApiFetch';

export const addAdminAction = createAsyncThunk(
    "auth/addUser",
    async ({ userData }, { rejectWithValue }) => {
        try {
            const data = await makeApiCall('POST', '/addAdmin', userData);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const adminListAction = createAsyncThunk(
    "auth/adminList",
    async (data, { rejectWithValue }) => {
        try {
            const response = await makeApiCall('POST', '/adminList',data);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const adminDeleteAction = createAsyncThunk(
    "auth/adminDelete",
    async ({ admin_id }, { rejectWithValue }) => {
        try {
            const data = await makeApiCall('POST', '/adminDelete',  admin_id );
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const adminPasswordUpdateAction = createAsyncThunk(
    "auth/adminPasswordUpdate",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const data = await makeApiCall('POST', '/adminPasswordUpdate', payload);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const adminStatusUpdateAction = createAsyncThunk(    
    "auth/adminStatusUpdate",
    async ({ payload }, { rejectWithValue }) => {
        console.log("payload", payload);
        try {
            const data = await makeApiCall('POST', '/adminStatusUpdate', payload);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editAdminAction = createAsyncThunk(
    "auth/editAdmin",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const data = await makeApiCall('POST', '/editAdmin', payload);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const adminMenusListAction = createAsyncThunk(
    "auth/adminMenusList",
    async (admin_id, { rejectWithValue }) => {
        try {
            const response = await makeApiCall('POST', '/adminMenusList', admin_id);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateAdminMenuAction = createAsyncThunk(
    "auth/updateAdminMenu",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const data = await makeApiCall('POST', '/updateAdminMenu', payload);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
