import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ComparisonState {
  selectedCategories: string[];
}

const initialState: ComparisonState = {
  selectedCategories: [],
};

export const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,

  reducers: {
    setSelectedCategories: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.selectedCategories.indexOf(category);

      if (index >= 0) {
        state.selectedCategories.splice(index, 1);
      } else if (state.selectedCategories.length < 2) {
        state.selectedCategories.push(category);
      } else {
        state.selectedCategories.shift();
        state.selectedCategories.push(category);
      }
    },
  },
});

// action
export const { setSelectedCategories } = comparisonSlice.actions;

//reducer
export const comparisonReducer = comparisonSlice.reducer;

//selector
export const selectComparison = (state: RootState) => state.comparison;
