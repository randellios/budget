// src/store/slices/apiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { budgetApi } from '../../api/budgetApi';

export const saveBudgetData = createAsyncThunk(
  'api/saveBudgetData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const budgetData = {
        income: state.income,
        expenses: state.expenses,
        savings: state.savings,
        debts: state.debts,
        ui: {
          selectedMonth: state.ui.selectedMonth,
          expandedSections: state.ui.expandedSections
        },
        lastUpdated: new Date().toISOString()
      };

      const result = await budgetApi.saveBudgetData(budgetData);

      if (!result.success) {
        return rejectWithValue(result.error);
      }

      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadBudgetData = createAsyncThunk(
  'api/loadBudgetData',
  async (_, { rejectWithValue }) => {
    try {
      const result = await budgetApi.loadBudgetData();

      if (!result.success) {
        return rejectWithValue(result.error);
      }

      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearBudgetData = createAsyncThunk(
  'api/clearBudgetData',
  async (_, { rejectWithValue }) => {
    try {
      const result = await budgetApi.clearBudgetData();

      if (!result.success) {
        return rejectWithValue(result.error);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isSaving: false,
  isLoading: false,
  lastSaved: null,
  saveError: null,
  loadError: null,
  autoSaveEnabled: true,
  saveQueue: [],
  dataLoaded: false
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    clearSaveError: (state) => {
      state.saveError = null;
    },
    clearLoadError: (state) => {
      state.loadError = null;
    },
    toggleAutoSave: (state) => {
      state.autoSaveEnabled = !state.autoSaveEnabled;
    },
    queueSave: (state, action) => {
      state.saveQueue.push({
        timestamp: Date.now(),
        action: action.payload
      });
    },
    clearSaveQueue: (state) => {
      state.saveQueue = [];
    },
    setDataLoaded: (state, action) => {
      state.dataLoaded = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveBudgetData.pending, (state) => {
        state.isSaving = true;
        state.saveError = null;
      })
      .addCase(saveBudgetData.fulfilled, (state) => {
        state.isSaving = false;
        state.lastSaved = new Date().toISOString();
        state.saveQueue = [];
      })
      .addCase(saveBudgetData.rejected, (state, action) => {
        state.isSaving = false;
        state.saveError = action.payload;
      })
      .addCase(loadBudgetData.pending, (state) => {
        state.isLoading = true;
        state.loadError = null;
      })
      .addCase(loadBudgetData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataLoaded = true;
        if (action.payload) {
          state.lastSaved =
            action.payload.lastUpdated || new Date().toISOString();
        }
      })
      .addCase(loadBudgetData.rejected, (state, action) => {
        state.isLoading = false;
        state.loadError = action.payload;
      })
      .addCase(clearBudgetData.fulfilled, (state) => {
        state.lastSaved = null;
        state.dataLoaded = false;
      });
  }
});

export const {
  clearSaveError,
  clearLoadError,
  toggleAutoSave,
  queueSave,
  clearSaveQueue,
  setDataLoaded
} = apiSlice.actions;

export const selectIsSaving = (state) => state.api.isSaving;
export const selectIsLoading = (state) => state.api.isLoading;
export const selectLastSaved = (state) => state.api.lastSaved;
export const selectSaveError = (state) => state.api.saveError;
export const selectLoadError = (state) => state.api.loadError;
export const selectAutoSaveEnabled = (state) => state.api.autoSaveEnabled;
export const selectSaveQueue = (state) => state.api.saveQueue;
export const selectDataLoaded = (state) => state.api.dataLoaded;

export default apiSlice.reducer;
