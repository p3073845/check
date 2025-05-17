import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true,
  isMobile: window.innerWidth < 767, 
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
  },
});

export const { toggleSidebar, setMobile, closeSidebar, openSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;