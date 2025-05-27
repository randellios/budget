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
  }
});

export const { updateMonthlyIncome } = incomeSlice.actions;

// Selectors
export const selectMonthlyIncome = (state) => state.income.monthlyIncome;
export const selectIncomeLastUpdated = (state) => state.income.lastUpdated;

export default incomeSlice.reducer;
