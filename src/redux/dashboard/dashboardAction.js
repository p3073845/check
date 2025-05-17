import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeApiCall } from '../../utils/ApiFetch';

export const dashboardAction = createAsyncThunk(
  "auth/dashboard",  
  async ({ payload }, { rejectWithValue }) => {
    try {
      const data = await makeApiCall('POST', '/dashboard', payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


