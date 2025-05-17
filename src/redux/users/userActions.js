import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeApiCall } from '../../utils/ApiFetch';

export const addUserAction = createAsyncThunk(
  "auth/addUser", 
  async ({ userData }, { rejectWithValue }) => {
    try {
      const data = await makeApiCall('POST', '/adduser', userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchUserListAction = createAsyncThunk(
  "auth/userList",
  async (page, { rejectWithValue }) => {
    try {
      const data = await makeApiCall('POST', '/userList', page);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changePasswordForusersAction = createAsyncThunk(
  "auth/userchangePassword", 
  async ({ payload }, { rejectWithValue }) => {
    try {
      const data = await makeApiCall('POST', '/userPasswordUpdate', payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changePasswordAction = createAsyncThunk(
  "auth/change-password",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const data = await makeApiCall('POST', '/changePassword', payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStatusAction = createAsyncThunk(
  "auth/updateStatus",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const data = await makeApiCall('POST', '/statusUpdate', payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  "auth/userDelete",
  async ({ user_id }, { rejectWithValue }) => {
    try {
      const data = await makeApiCall('POST', '/userDelete', user_id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editUserAction = createAsyncThunk(
  "auth/editUser",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const data = await makeApiCall('POST', '/editUser', payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);