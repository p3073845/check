import { createSlice } from "@reduxjs/toolkit";
import {
  addUserAction,
  changePasswordForusersAction,
  fetchUserListAction,
  changePasswordAction,
  updateStatusAction,
  deleteUserAction,
  editUserAction
} from "./userActions";

const UserAddSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [], 
    loadingStatusUpdates: {},
    viewLogs: [],
    token: null,
    loading: false,
    loadingpass: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        if (
          Array.isArray(state.users) &&
          !state.users.some((user) => user.id === action.payload.id)
        ) {
          state.users.push(action.payload);
        }
      })
      .addCase(addUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(changePasswordForusersAction.pending, (state) => {
        state.loadingpass = true;
        state.error = null;
      })
      .addCase(changePasswordForusersAction.fulfilled, (state) => {
        state.loadingpass = false;
      })
      .addCase(changePasswordForusersAction.rejected, (state, action) => {
        state.loadingpass = false;
        state.error = action.payload;
      })

      .addCase(changePasswordAction.pending, (state) => {
        state.loadingpass = true;
        state.error = null;
      })
      .addCase(changePasswordAction.fulfilled, (state) => {
        state.loadingpass = false;
      })
      .addCase(changePasswordAction.rejected, (state, action) => {
        state.loadingpass = false;
        state.error = action.payload;
      })
      .addCase(fetchUserListAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserListAction.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUserListAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStatusAction.pending, (state, action) => {
        const { id } = action.meta.arg;
        state.loadingStatusUpdates[id] = true; 
      })
      .addCase(updateStatusAction.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        if (state.users?.data?.data) {
          const userIndex = state.users.data.data.findIndex((user) => user.id === id);
          if (userIndex !== -1) {
            state.users.data.data[userIndex].status = status;
          }
        }
        delete state.loadingStatusUpdates[id]; 
      })
      .addCase(updateStatusAction.rejected, (state, action) => {
        const { id } = action.meta.arg;
        delete state.loadingStatusUpdates[id]; 
      })
      .addCase(deleteUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (state.users?.data?.data) {
          state.users.data.data = state.users.data.data.filter((user) => user.id !== id);
        }
      })
      .addCase(deleteUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserAction.fulfilled, (state, action) => {
        state.loading = false;
        const { id, updatedUser } = action.payload;
        if (state.users?.data?.data) {
          const userIndex = state.users.data.data.findIndex((user) => user.id === id);
          if (userIndex !== -1) {
            state.users.data.data[userIndex] = { ...state.users.data.data[userIndex], ...updatedUser };
          }
        }
      })
      .addCase(editUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  
  },
});
export const { updateStatusPending, updateStatusFulfilled, updateStatusRejected } = UserAddSlice.actions;
export default UserAddSlice.reducer;
