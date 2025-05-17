// src/redux/slices/dashboardSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { dashboardAction } from './dashboardAction';

const initialState = {
  dashboardData: 0,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dashboardAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(dashboardAction.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action?.payload?.data;
        
      })
      .addCase(dashboardAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
