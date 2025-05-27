// src/api/budgetApi.js
const STORAGE_KEY = 'budgetDashboard_data';
const STORAGE_VERSION = '1.0';

export const budgetApi = {
  saveBudgetData: async (budgetData) => {
    try {
      const dataWithVersion = {
        version: STORAGE_VERSION,
        timestamp: new Date().toISOString(),
        data: budgetData
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithVersion));

      // Simulate network delay for development
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: budgetData,
            message: 'Data saved to localStorage'
          });
        }, 500);
      });
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return {
        success: false,
        error: error.message || 'Failed to save budget data to localStorage'
      };
    }
  },

  loadBudgetData: async () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        return {
          success: true,
          data: null,
          message: 'No saved data found'
        };
      }

      const parsedData = JSON.parse(stored);

      // Version check for future migrations
      if (parsedData.version !== STORAGE_VERSION) {
        console.warn('Data version mismatch, using defaults');
        return {
          success: true,
          data: null,
          message: 'Data version mismatch'
        };
      }

      // Simulate network delay for development
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: parsedData.data,
            timestamp: parsedData.timestamp,
            message: 'Data loaded from localStorage'
          });
        }, 300);
      });
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return {
        success: false,
        error: error.message || 'Failed to load budget data from localStorage'
      };
    }
  },

  clearBudgetData: async () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return {
        success: true,
        message: 'Data cleared from localStorage'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to clear budget data'
      };
    }
  }
};
