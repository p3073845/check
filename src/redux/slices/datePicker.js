import { createSlice } from '@reduxjs/toolkit';

const datePickerSlice = createSlice({
  name: 'datePicker',
  initialState: {
    startDate: null,
    endDate: null
  },
  reducers: {
    setFilter: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    }
  }
});

export const { setFilter } = datePickerSlice.actions;
export default datePickerSlice.reducer;