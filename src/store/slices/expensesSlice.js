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
    moveCategoryUp: (state, action) => {
      const categoryId = action.payload;
      const index = state.categories.findIndex((cat) => cat.id === categoryId);
      if (index > 0) {
        const category = state.categories[index];
        state.categories.splice(index, 1);
        state.categories.splice(index - 1, 0, category);
      }
    },
    moveCategoryDown: (state, action) => {
      const categoryId = action.payload;
      const index = state.categories.findIndex((cat) => cat.id === categoryId);
      if (index < state.categories.length - 1) {
        const category = state.categories[index];
        state.categories.splice(index, 1);
        state.categories.splice(index + 1, 0, category);
      }
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
    },
    reorderExpenseItems: (state, action) => {
      const { sourceCategoryId, targetCategoryId, sourceIndex, targetIndex } =
        action.payload;

      const sourceCategory = state.categories.find(
        (cat) => cat.id === sourceCategoryId
      );
      const targetCategory = state.categories.find(
        (cat) => cat.id === targetCategoryId
      );

      if (!sourceCategory || !targetCategory) return;

      const [draggedItem] = sourceCategory.items.splice(sourceIndex, 1);

      if (sourceCategoryId === targetCategoryId) {
        targetCategory.items.splice(targetIndex, 0, draggedItem);
      } else {
        targetCategory.items.splice(targetIndex, 0, draggedItem);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase('HYDRATE_DATA', (state, action) => {
      if (action.payload.expenses) {
        const loadedExpenses = action.payload.expenses;

        if (
          loadedExpenses.categories &&
          Array.isArray(loadedExpenses.categories)
        ) {
          state.categories = loadedExpenses.categories;
        }

        if (loadedExpenses.nextItemId) {
          state.nextItemId = loadedExpenses.nextItemId;
        }
        if (loadedExpenses.nextCategoryId) {
          state.nextCategoryId = loadedExpenses.nextCategoryId;
        }
      }
    });
  }
});

export const {
  addCategory,
  updateCategory,
  deleteCategory,
  moveCategoryUp,
  moveCategoryDown,
  addExpenseItem,
  updateExpenseItem,
  deleteExpenseItem,
  toggleItemEssential,
  toggleItemFlexible,
  reorderExpenseItems
} = expensesSlice.actions;

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
