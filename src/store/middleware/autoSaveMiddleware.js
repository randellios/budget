// src/store/middleware/autoSaveMiddleware.js
import { saveBudgetData, queueSave } from '../slices/apiSlice';
import { useDebouncedCallback } from 'use-debounce';

const ACTIONS_TO_SAVE = [
  'income/updateMonthlyIncome',
  'expenses/addCategory',
  'expenses/updateCategory',
  'expenses/deleteCategory',
  'expenses/addExpenseItem',
  'expenses/updateExpenseItem',
  'expenses/deleteExpenseItem',
  'expenses/toggleItemEssential',
  'expenses/toggleItemFlexible',
  'savings/addSavingsGoal',
  'savings/updateSavingsGoal',
  'savings/deleteSavingsGoal',
  'savings/updateGoalBalance',
  'debts/addDebt',
  'debts/updateDebt',
  'debts/deleteDebt',
  'debts/makePayment'
];

let debouncedSave;

export const autoSaveMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();
  const shouldSave =
    ACTIONS_TO_SAVE.includes(action.type) && state.api.autoSaveEnabled;

  if (shouldSave) {
    store.dispatch(queueSave(action.type));

    if (!debouncedSave) {
      debouncedSave = setTimeout(() => {
        store.dispatch(saveBudgetData());
        debouncedSave = null;
      }, 2000);
    }
  }

  return result;
};
