// src/store/index.js (updated)
import { configureStore } from '@reduxjs/toolkit';
import incomeReducer from './slices/incomeSlice';
import expensesReducer from './slices/expensesSlice';
import savingsReducer from './slices/savingsSlice';
import debtsReducer from './slices/debtsSlice';
import uiReducer from './slices/uiSlice';
import apiReducer from './slices/apiSlice';
import { autoSaveMiddleware } from './middleware/autoSaveMiddleware';
import { dataHydrationMiddleware } from './middleware/dataHydrationMiddleware';
import { loadBudgetData } from './slices/apiSlice';

export const store = configureStore({
  reducer: {
    income: incomeReducer,
    expenses: expensesReducer,
    savings: savingsReducer,
    debts: debtsReducer,
    ui: uiReducer,
    api: apiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'HYDRATE_DATA']
      }
    }).concat(autoSaveMiddleware, dataHydrationMiddleware)
});

// Load initial data
store.dispatch(loadBudgetData());
