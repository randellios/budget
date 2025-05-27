// src/store/slices/savingsSlice.js
import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  goals: [
    {
      id: 1,
      name: 'Emergency Fund',
      icon: '🎯',
      currentBalance: 1000,
      targetAmount: 5000,
      targetDate: '2026-12',
      monthlyContribution: 100,
      priority: 'High',
      description: 'Essential safety net'
    },
    {
      id: 2,
      name: 'Holiday Fund',
      icon: '🏖️',
      currentBalance: 500,
      targetAmount: 2000,
      targetDate: '2025-08',
      monthlyContribution: 100,
      priority: 'Medium',
      description: 'Next family vacation'
    }
  ],
  nextGoalId: 3
};

const savingsSlice = createSlice({
  name: 'savings',
  initialState,
  reducers: {
    addSavingsGoal: (state, action) => {
      const newGoal = {
        id: state.nextGoalId,
        name: action.payload.name || 'New Goal',
        icon: action.payload.icon || '🎯',
        currentBalance: action.payload.currentBalance || 0,
        targetAmount: action.payload.targetAmount || 1000,
        targetDate: action.payload.targetDate || '',
        monthlyContribution: action.payload.monthlyContribution || 0,
        priority: action.payload.priority || 'Medium',
        description: action.payload.description || ''
      };
      state.goals.push(newGoal);
      state.nextGoalId += 1;
    },
    updateSavingsGoal: (state, action) => {
      const { goalId, field, value } = action.payload;
      const goal = state.goals.find((goal) => goal.id === goalId);
      if (goal) {
        if (
          ['currentBalance', 'targetAmount', 'monthlyContribution'].includes(
            field
          )
        ) {
          goal[field] = parseFloat(value) || 0;
        } else {
          goal[field] = value;
        }
      }
    },
    deleteSavingsGoal: (state, action) => {
      state.goals = state.goals.filter((goal) => goal.id !== action.payload);
    },
    updateGoalBalance: (state, action) => {
      const { goalId, amount } = action.payload;
      const goal = state.goals.find((goal) => goal.id === goalId);
      if (goal) {
        goal.currentBalance = Math.max(0, goal.currentBalance + amount);
      }
    }
  }
});

export const {
  addSavingsGoal,
  updateSavingsGoal,
  deleteSavingsGoal,
  updateGoalBalance
} = savingsSlice.actions;

// Selectors
export const selectSavingsGoals = (state) => state.savings.goals;
export const selectTotalSavingsContributions = createSelector(
  [selectSavingsGoals],
  (goals) => goals.reduce((total, goal) => total + goal.monthlyContribution, 0)
);
export const selectTotalSavingsBalance = createSelector(
  [selectSavingsGoals],
  (goals) => goals.reduce((total, goal) => total + goal.currentBalance, 0)
);
export const selectTotalSavingsTarget = createSelector(
  [selectSavingsGoals],
  (goals) => goals.reduce((total, goal) => total + goal.targetAmount, 0)
);

export default savingsSlice.reducer;
