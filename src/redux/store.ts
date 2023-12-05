import { configureStore } from '@reduxjs/toolkit';

import { salesApi } from './sales/salesApi';
import { filterReducer } from './filter/filterSlice';
import { tableDataReducer } from './tableData/tableData';
import { comparisonReducer } from './compare/compareSlice';

export const store = configureStore({
  reducer: {
    [salesApi.reducerPath]: salesApi.reducer,
    filter: filterReducer,
    newTableData: tableDataReducer,
    comparison: comparisonReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(salesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
