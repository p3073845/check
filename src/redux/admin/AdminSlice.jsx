import { createSlice } from "@reduxjs/toolkit";
import {
  addAdminAction,
  adminListAction,
  adminPasswordUpdateAction,
  adminStatusUpdateAction,
  adminDeleteAction,
  editAdminAction,
  adminMenusListAction,
  updateAdminMenuAction
} from "./AdminAction";

const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    user: null,
    admin: [], 
    loadingStatusUpdates: {},
    viewLogs: [],
    token: null,
    loading: false,
    loadingpass: false,
    loadingMenu: false,
    loadingMenuUpdate: false,
    error: null,
  },
  reducers: {
     updateStatusPending: (state, action) => {
      const { id } = action.payload;
      state.loadingStatusUpdates[id] = true;
    },
    updateStatusFulfilled: (state, action) => {
      const { id } = action.payload;
      state.loadingStatusUpdates[id] = false;
    },
    updateStatusRejected: (state, action) => {
      const { id } = action.payload;
      state.loadingStatusUpdates[id] = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAdminAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAdminAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        if (
          Array.isArray(state.admin) &&
          !state.admin.some((user) => user.id === action.payload.id)
        ) {
          state.admin.push(action.payload);
        }
      })
      .addCase(addAdminAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(adminPasswordUpdateAction.pending, (state) => {
        state.loadingpass = true;
        state.error = null;
      })
      .addCase(adminPasswordUpdateAction.fulfilled, (state) => {
        state.loadingpass = false;
      })
      .addCase(adminPasswordUpdateAction.rejected, (state, action) => {
        state.loadingpass = false;
        state.error = action.payload;
      })
      .addCase(adminListAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminListAction.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(adminListAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(adminStatusUpdateAction.pending, (state, action) => {
        const { id } = action.meta.arg;
        state.loadingStatusUpdates[id] = true; 
      })
      .addCase(adminStatusUpdateAction.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        if (state.admin?.data?.data) {
          const userIndex = state.admin.data.data.findIndex((user) => user.id === id);
          if (userIndex !== -1) {
            state.admin.data.data[userIndex].status = status;
          }
        }
        delete state.loadingStatusUpdates[id]; 
      })
      .addCase(adminStatusUpdateAction.rejected, (state, action) => {
        const { id } = action.meta.arg;
        delete state.loadingStatusUpdates[id]; 
      })
      .addCase(adminDeleteAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminDeleteAction.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (state.admin?.data?.data) {
          state.admin.data.data = state.admin.data.data.filter((user) => user.id !== id);
        }
      })
      .addCase(adminDeleteAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editAdminAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAdminAction.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (state.admin?.data?.data) {
          const userIndex = state.admin.data.data.findIndex((user) => user.id === id);
          if (userIndex !== -1) {
            state.admin.data.data[userIndex] = action.payload;
          }
        }
      })
      .addCase(editAdminAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(adminMenusListAction.pending, (state) => {
        state.loadingMenu = true;
        state.error = null;
      })
      .addCase(adminMenusListAction.fulfilled, (state, action) => {
        state.loadingMenu = false;
        state.viewLogs = action.payload;
      })
      .addCase(adminMenusListAction.rejected, (state, action) => {
        state.loadingMenu = false;
        state.error = action.payload;
      })
      .addCase(updateAdminMenuAction.pending, (state) => {
        state.loadingMenuUpdate = true;
        state.error = null;
      })
      .addCase(updateAdminMenuAction.fulfilled, (state, action) => {
        state.loadingMenuUpdate = false;
        const { id } = action.payload;
        if (state.viewLogs?.data?.data) {
          const userIndex = state.viewLogs.data.data.findIndex((user) => user.id === id);
          if (userIndex !== -1) {
            state.viewLogs.data.data[userIndex] = action.payload;
          }
        }
      })
      .addCase(updateAdminMenuAction.rejected, (state, action) => {
        state.loadingMenuUpdate = false;
        state.error = action.payload;
      });
  },
});
export const { updateStatusPending, updateStatusFulfilled, updateStatusRejected } = AdminSlice.actions;
export default AdminSlice.reducer;
