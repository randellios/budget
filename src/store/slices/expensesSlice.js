// src/store/slices/expensesSlice.js
import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      id: 1,
      name: 'Home',
      icon: '🏠',
      items: [
        {
          id: 1,
          name: 'Mortgage',
          amount: 1000,
          isEssential: true,
          isFlexible: false
        },
        {
          id: 2,
          name: 'Council Tax',
          amount: 150,
          isEssential: true,
          isFlexible: false
        },
        {
          id: 3,
          name: 'Home Insurance',
          amount: 150,
          isEssential: true,
          isFlexible: false
        }
      ]
    },
    {
      id: 2,
      name: 'Utilities',
      icon: '⚡',
      items: [
        {
          id: 4,
          name: 'Electricity',
          amount: 120,
          isEssential: true,
          isFlexible: false
        },
        {
          id: 5,
          name: 'Gas',
          amount: 80,
          isEssential: true,
          isFlexible: false
        },
        {
          id: 6,
          name: 'Water',
          amount: 45,
          isEssential: true,
          isFlexible: false
        },
        {
          id: 7,
          name: 'Internet',
          amount: 35,
          isEssential: false,
          isFlexible: true
        }
      ]
    },
    {
      id: 3,
      name: 'Entertainment',
      icon: '🍿',
      items: [
        {
          id: 8,
          name: 'Netflix',
          amount: 15,
          isEssential: false,
          isFlexible: true
        },
        {
          id: 9,
          name: 'Spotify',
          amount: 12,
          isEssential: false,
          isFlexible: true
        },
        {
          id: 10,
          name: 'Dining Out',
          amount: 150,
          isEssential: false,
          isFlexible: true
        }
      ]
    }
  ],
  nextItemId: 11,
  nextCategoryId: 4
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = {
        id: state.nextCategoryId,
        name: action.payload.name || 'New Category',
        icon: action.payload.icon || '📝',
        items: []
      };
      state.categories.push(newCategory);
      state.nextCategoryId += 1;
    },
    updateCategory: (state, action) => {
      const { categoryId, field, value } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category[field] = value;
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
    },
    addExpenseItem: (state, action) => {
      const { categoryId, item } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const newItem = {
          id: state.nextItemId,
          name: item.name || 'New Expense',
          amount: item.amount || 0,
          isEssential: item.isEssential || false,
          isFlexible: item.isFlexible || true
        };
        category.items.push(newItem);
        state.nextItemId += 1;
      }
    },
    updateExpenseItem: (state, action) => {
      const { categoryId, itemId, field, value } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const item = category.items.find((item) => item.id === itemId);
        if (item) {
          item[field] = field === 'amount' ? parseFloat(value) || 0 : value;
        }
      }
    },
    deleteExpenseItem: (state, action) => {
      const { categoryId, itemId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.items = category.items.filter((item) => item.id !== itemId);
      }
    },
    toggleItemEssential: (state, action) => {
      const { categoryId, itemId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const item = category.items.find((item) => item.id === itemId);
        if (item) {
          item.isEssential = !item.isEssential;
        }
      }
    },
    toggleItemFlexible: (state, action) => {
      const { categoryId, itemId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const item = category.items.find((item) => item.id === itemId);
        if (item) {
          item.isFlexible = !item.isFlexible;
        }
      }
    }
  }
});

export const {
  addCategory,
  updateCategory,
  deleteCategory,
  addExpenseItem,
  updateExpenseItem,
  deleteExpenseItem,
  toggleItemEssential,
  toggleItemFlexible
} = expensesSlice.actions;

// Selectors
export const selectExpenseCategories = (state) => state.expenses.categories;
export const selectTotalExpenses = createSelector(
  [selectExpenseCategories],
  (categories) =>
    categories.reduce(
      (total, category) =>
        total +
        category.items.reduce((catTotal, item) => catTotal + item.amount, 0),
      0
    )
);
export const selectEssentialExpenses = createSelector(
  [selectExpenseCategories],
  (categories) =>
    categories.reduce(
      (total, category) =>
        total +
        category.items
          .filter((item) => item.isEssential)
          .reduce((catTotal, item) => catTotal + item.amount, 0),
      0
    )
);
export const selectNonEssentialExpenses = createSelector(
  [selectExpenseCategories],
  (categories) =>
    categories.reduce(
      (total, category) =>
        total +
        category.items
          .filter((item) => !item.isEssential)
          .reduce((catTotal, item) => catTotal + item.amount, 0),
      0
    )
);
export const selectFlexibleExpenses = createSelector(
  [selectExpenseCategories],
  (categories) =>
    categories.reduce(
      (total, category) =>
        total +
        category.items
          .filter((item) => item.isFlexible)
          .reduce((catTotal, item) => catTotal + item.amount, 0),
      0
    )
);

export default expensesSlice.reducer;
