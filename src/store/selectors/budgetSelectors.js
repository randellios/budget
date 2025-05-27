// src/store/selectors/budgetSelectors.js
import { createSelector } from '@reduxjs/toolkit';
import { selectMonthlyIncome } from '../slices/incomeSlice';
import {
  selectTotalExpenses,
  selectEssentialExpenses,
  selectNonEssentialExpenses
} from '../slices/expensesSlice';
import { selectTotalSavingsContributions } from '../slices/savingsSlice';
import { selectTotalDebtPayments } from '../slices/debtsSlice';

export const selectTotalOutgoings = createSelector(
  [
    selectTotalExpenses,
    selectTotalSavingsContributions,
    selectTotalDebtPayments
  ],
  (expenses, savings, debts) => expenses + savings + debts
);

export const selectRemainingIncome = createSelector(
  [selectMonthlyIncome, selectTotalOutgoings],
  (income, outgoings) => income - outgoings
);

export const selectBudgetAllocationPercentage = createSelector(
  [selectMonthlyIncome, selectTotalOutgoings],
  (income, outgoings) => (income > 0 ? (outgoings / income) * 100 : 0)
);

export const selectBudgetBreakdown = createSelector(
  [
    selectMonthlyIncome,
    selectEssentialExpenses,
    selectNonEssentialExpenses,
    selectTotalSavingsContributions,
    selectTotalDebtPayments
  ],
  (income, essential, nonEssential, savings, debts) => ({
    essential: {
      amount: essential,
      percentage: income > 0 ? (essential / income) * 100 : 0,
      target: income * 0.5
    },
    nonEssential: {
      amount: nonEssential,
      percentage: income > 0 ? (nonEssential / income) * 100 : 0,
      target: income * 0.3
    },
    savingsAndDebts: {
      amount: savings + debts,
      percentage: income > 0 ? ((savings + debts) / income) * 100 : 0,
      target: income * 0.2
    }
  })
);
