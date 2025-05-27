// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import incomeReducer from './slices/incomeSlice';
import expensesReducer from './slices/expensesSlice';
import savingsReducer from './slices/savingsSlice';
import debtsReducer from './slices/debtsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    income: incomeReducer,
    expenses: expensesReducer,
    savings: savingsReducer,
    debts: debtsReducer,
    ui: uiReducer
  }
});
