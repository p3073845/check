import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify'; 
import { navigate } from "../../utils/navigationService"
import { makeApiCall } from "../../utils/ApiFetch";

// Async thunk for login API
export const loginUserAction = createAsyncThunk(
  "auth/login", 
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await makeApiCall('POST', '/login', credentials);
      if(response?.code === 0 && response?.error === false ){
        toast.success(response.message);
        localStorage.setItem("token", JSON.stringify({ token: response?.data?.token }));
        localStorage.setItem("user", JSON.stringify({ token: response?.data }))
      }
      return response; 
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
});

export const logoutUserAction = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeApiCall('POST', '/logout');
      
      if (response?.code === 0 && response?.error === false) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success(response.message);
        navigate("/login");
      } 
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);
