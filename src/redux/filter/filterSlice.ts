import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const filterSlice = createSlice({
  name: 'filter',

  initialState: {
    category: '',
    startDate: null,
    endDate: null,
  },

  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

// actions
export const { setCategory, setStartDate, setEndDate } = filterSlice.actions;

//reducer
export const filterReducer = filterSlice.reducer;

//selector
export const selectFilter = (state: RootState) => state.filter;
