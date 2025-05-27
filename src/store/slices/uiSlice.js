// src/store/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMonth: new Date().toISOString(),
  expandedSections: {
    monthlyBudget: true,
    savingsGoals: true,
    debtManagement: true
  },
  expandedCategories: {},
  expandedDebts: {},
  expandedSavings: {},
  editingField: null,
  showIconPicker: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    toggleSection: (state, action) => {
      const section = action.payload;
      state.expandedSections[section] = !state.expandedSections[section];
    },
    toggleCategory: (state, action) => {
      const categoryId = action.payload;
      state.expandedCategories[categoryId] =
        !state.expandedCategories[categoryId];
    },
    toggleDebt: (state, action) => {
      const debtId = action.payload;
      state.expandedDebts[debtId] = !state.expandedDebts[debtId];
    },
    toggleSaving: (state, action) => {
      const savingId = action.payload;
      state.expandedSavings[savingId] = !state.expandedSavings[savingId];
    },
    setEditingField: (state, action) => {
      state.editingField = action.payload;
    },
    setShowIconPicker: (state, action) => {
      state.showIconPicker = action.payload;
    }
  }
});

export const {
  setSelectedMonth,
  toggleSection,
  toggleCategory,
  toggleDebt,
  toggleSaving,
  setEditingField,
  setShowIconPicker
} = uiSlice.actions;

// Selectors
export const selectSelectedMonth = (state) => state.ui.selectedMonth;
export const selectExpandedSections = (state) => state.ui.expandedSections;
export const selectExpandedCategories = (state) => state.ui.expandedCategories;
export const selectExpandedDebts = (state) => state.ui.expandedDebts;
export const selectExpandedSavings = (state) => state.ui.expandedSavings;
export const selectEditingField = (state) => state.ui.editingField;
export const selectShowIconPicker = (state) => state.ui.showIconPicker;

export default uiSlice.reducer;
