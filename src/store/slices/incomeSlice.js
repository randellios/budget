// src/store/slices/incomeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  monthlyIncome: 5000,
  lastUpdated: new Date().toISOString()
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    updateMonthlyIncome: (state, action) => {
      state.monthlyIncome = action.payload;
      state.lastUpdated = new Date().toISOString();
    }
  },
  extraReducers: (builder) => {
    builder.addCase('HYDRATE_DATA', (state, action) => {
      if (action.payload.income) {
        state.monthlyIncome =
          action.payload.income.monthlyIncome || state.monthlyIncome;
        state.lastUpdated =
          action.payload.income.lastUpdated || state.lastUpdated;
      }
    });
  }
});

export const { updateMonthlyIncome } = incomeSlice.actions;
export const selectMonthlyIncome = (state) => state.income.monthlyIncome;
export const selectIncomeLastUpdated = (state) => state.income.lastUpdated;
export default incomeSlice.reducer;
