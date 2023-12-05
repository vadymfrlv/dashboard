import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const tableDataSlice = createSlice({
  name: 'newTableData',

  initialState: {
    tableData: [],
    columnsData: [],
  },

  reducers: {
    setTableTData: (state, action) => {
      state.tableData = action.payload;
    },
    setTableDData: (state, action) => {
      state.columnsData = action.payload;
    },
  },
});

// actions
export const { setTableTData, setTableDData } = tableDataSlice.actions;

//reducer
export const tableDataReducer = tableDataSlice.reducer;

//selector
export const selectTableData = (state: RootState) => state.newTableData;
