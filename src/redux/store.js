import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
import sidebarReducer from './slices/sidebarSlice';
import userReducer from './users/userSlice';
import dashboardReducer from './dashboard/dashboardSlice';
import datePickerReducer from './slices/datePicker';
import siteReducer from './site/SitesSlice';
import adminReducer from './admin/AdminSlice';
const store = configureStore({
  reducer: {
    datePicker: datePickerReducer,
    auth: authReducer,
    sidebar: sidebarReducer,
    user: userReducer,
    dashboard: dashboardReducer,
    site: siteReducer,
    admin: adminReducer,
  },
});

export default store;