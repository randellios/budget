import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  categories: {
    needs: {
      id: 'needs',
      name: 'Needs',
      icon: '🏠',
      description: 'Absolute necessities for survival',
      items: [
        { id: 1, name: 'Mortgage', amount: 1000 },
        { id: 2, name: 'Council Tax', amount: 150 },
        { id: 3, name: 'Home Insurance', amount: 150 }
      ]
    },
    basics: {
      id: 'basics',
      name: 'Basics',
      icon: '⚡',
      description: 'Important for daily functioning',
      items: [
        { id: 4, name: 'Electricity', amount: 120 },
        { id: 5, name: 'Gas', amount: 80 },
        { id: 6, name: 'Water', amount: 45 },
        { id: 7, name: 'Internet', amount: 35 }
      ]
    },
    wants: {
      id: 'wants',
      name: 'Wants',
      icon: '🍿',
      description: 'Lifestyle and entertainment',
      items: [
        { id: 8, name: 'Netflix', amount: 15 },
        { id: 9, name: 'Spotify', amount: 12 },
        { id: 10, name: 'Dining Out', amount: 150 }
      ]
    }
  },
  nextItemId: 11
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpenseItem: (state, action) => {
      const { categoryId, item } = action.payload;
      if (state.categories[categoryId]) {
        const newItem = {
          id: state.nextItemId,
          name: item.name || 'New Expense',
          amount: item.amount || 0
        };
        state.categories[categoryId].items.push(newItem);
        state.nextItemId += 1;
      }
    },
    updateExpenseItem: (state, action) => {
      const { categoryId, itemId, field, value } = action.payload;
      const category = state.categories[categoryId];
      if (category) {
        const item = category.items.find((item) => item.id === itemId);
        if (item) {
          item[field] = field === 'amount' ? parseFloat(value) || 0 : value;
        }
      }
    },
    deleteExpenseItem: (state, action) => {
      const { categoryId, itemId } = action.payload;
      const category = state.categories[categoryId];
      if (category) {
        category.items = category.items.filter((item) => item.id !== itemId);
      }
    },
    moveExpenseItem: (state, action) => {
      const { fromCategoryId, toCategoryId, itemId } = action.payload;
      const fromCategory = state.categories[fromCategoryId];
      const toCategory = state.categories[toCategoryId];

      if (fromCategory && toCategory && fromCategoryId !== toCategoryId) {
        const itemIndex = fromCategory.items.findIndex(
          (item) => item.id === itemId
        );
        if (itemIndex !== -1) {
          const [item] = fromCategory.items.splice(itemIndex, 1);
          toCategory.items.push(item);
        }
      }
    },
    reorderExpenseItems: (state, action) => {
      const { sourceCategoryId, targetCategoryId, sourceIndex, targetIndex } =
        action.payload;
      const sourceCategory = state.categories[sourceCategoryId];
      const targetCategory = state.categories[targetCategoryId];

      if (sourceCategory && targetCategory) {
        const [draggedItem] = sourceCategory.items.splice(sourceIndex, 1);
        targetCategory.items.splice(targetIndex, 0, draggedItem);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase('HYDRATE_DATA', (state, action) => {
      if (action.payload.expenses?.categories) {
        const loadedCategories = action.payload.expenses.categories;
        ['needs', 'basics', 'wants'].forEach((categoryId) => {
          if (loadedCategories[categoryId]?.items) {
            state.categories[categoryId].items =
              loadedCategories[categoryId].items;
          }
        });
      }
      if (action.payload.expenses?.nextItemId) {
        state.nextItemId = action.payload.expenses.nextItemId;
      }
    });
  }
});

export const {
  addExpenseItem,
  updateExpenseItem,
  deleteExpenseItem,
  moveExpenseItem,
  reorderExpenseItems
} = expensesSlice.actions;

// Selectors
export const selectExpenseCategories = (state) => state.expenses.categories;

const calculateCategoryTotal = (items) =>
  items.reduce((total, item) => total + item.amount, 0);

export const selectNeedsExpenses = createSelector(
  [selectExpenseCategories],
  (categories) => calculateCategoryTotal(categories.needs.items)
);

export const selectBasicsExpenses = createSelector(
  [selectExpenseCategories],
  (categories) => calculateCategoryTotal(categories.basics.items)
);

export const selectWantsExpenses = createSelector(
  [selectExpenseCategories],
  (categories) => calculateCategoryTotal(categories.wants.items)
);

export const selectEssentialExpenses = createSelector(
  [selectNeedsExpenses, selectBasicsExpenses],
  (needs, basics) => needs + basics
);

export const selectNonEssentialExpenses = createSelector(
  [selectWantsExpenses],
  (wants) => wants
);

export const selectTotalExpenses = createSelector(
  [selectNeedsExpenses, selectBasicsExpenses, selectWantsExpenses],
  (needs, basics, wants) => needs + basics + wants
);

export const selectFlexibleExpenses = createSelector(
  [selectWantsExpenses],
  (wants) => wants
);

export default expensesSlice.reducer;
