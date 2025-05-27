// src/store/slices/debtsSlice.js
import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  debts: [
    {
      id: 1,
      name: 'Credit Card',
      icon: '💳',
      startingBalance: 5000,
      currentBalance: 2000,
      interestRate: 22.9,
      monthlyPayment: 67,
      minimumPayment: 50,
      priority: 'High'
    },
    {
      id: 2,
      name: 'Car Loan',
      icon: '🚗',
      startingBalance: 10000,
      currentBalance: 3000,
      interestRate: 6.5,
      monthlyPayment: 100,
      minimumPayment: 100,
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'Student Loan',
      icon: '🎓',
      startingBalance: 22000,
      currentBalance: 5000,
      interestRate: 3.2,
      monthlyPayment: 33,
      minimumPayment: 33,
      priority: 'Low'
    }
  ],
  nextDebtId: 4
};

const debtsSlice = createSlice({
  name: 'debts',
  initialState,
  reducers: {
    addDebt: (state, action) => {
      const newDebt = {
        id: state.nextDebtId,
        name: action.payload.name || 'New Debt',
        icon: action.payload.icon || '💳',
        startingBalance: action.payload.startingBalance || 0,
        currentBalance: action.payload.currentBalance || 0,
        interestRate: action.payload.interestRate || 0,
        monthlyPayment: action.payload.monthlyPayment || 0,
        minimumPayment: action.payload.minimumPayment || 0,
        priority: action.payload.priority || 'Medium'
      };
      state.debts.push(newDebt);
      state.nextDebtId += 1;
    },
    updateDebt: (state, action) => {
      const { debtId, field, value } = action.payload;
      const debt = state.debts.find((debt) => debt.id === debtId);
      if (debt) {
        if (
          [
            'startingBalance',
            'currentBalance',
            'interestRate',
            'monthlyPayment',
            'minimumPayment'
          ].includes(field)
        ) {
          debt[field] = parseFloat(value) || 0;
        } else {
          debt[field] = value;
        }
      }
    },
    deleteDebt: (state, action) => {
      state.debts = state.debts.filter((debt) => debt.id !== action.payload);
    },
    makePayment: (state, action) => {
      const { debtId, amount } = action.payload;
      const debt = state.debts.find((debt) => debt.id === debtId);
      if (debt) {
        debt.currentBalance = Math.max(0, debt.currentBalance - amount);
      }
    }
  }
});

export const { addDebt, updateDebt, deleteDebt, makePayment } =
  debtsSlice.actions;

// Selectors
export const selectDebts = (state) => state.debts.debts;
export const selectTotalDebtPayments = createSelector([selectDebts], (debts) =>
  debts.reduce((total, debt) => total + debt.monthlyPayment, 0)
);
export const selectTotalDebtBalance = createSelector([selectDebts], (debts) =>
  debts.reduce((total, debt) => total + debt.currentBalance, 0)
);
export const selectTotalMinimumPayments = createSelector(
  [selectDebts],
  (debts) => debts.reduce((total, debt) => total + debt.minimumPayment, 0)
);
export const selectHighestInterestDebt = createSelector(
  [selectDebts],
  (debts) =>
    debts.reduce(
      (highest, debt) =>
        debt.interestRate > (highest?.interestRate || 0) ? debt : highest,
      null
    )
);

export default debtsSlice.reducer;
