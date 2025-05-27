import apiClient from './client';

export const budgetApi = {
  saveBudgetData: async (budgetData) => {
    try {
      // const response = await apiClient.post('/budget', budgetData);
      // return { success: true, data: response.data };
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, data: budgetData });
        }, 1000);
      });
    } catch (error) {
      console.error('Error saving budget data:', error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to save budget data'
      };
    }
  },

  loadBudgetData: async () => {
    try {
      const response = await apiClient.get('/budget');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error loading budget data:', error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to load budget data'
      };
    }
  }
};
