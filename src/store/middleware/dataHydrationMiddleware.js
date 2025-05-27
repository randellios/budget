// src/store/middleware/dataHydrationMiddleware.js
export const dataHydrationMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Hydrate store with loaded data
  if (action.type === 'api/loadBudgetData/fulfilled' && action.payload) {
    const data = action.payload;

    // Only hydrate if we have actual data (not null/empty)
    if (data && typeof data === 'object') {
      // Dispatch a special hydration action that each slice can handle
      store.dispatch({
        type: 'HYDRATE_DATA',
        payload: data
      });
    }
  }

  return result;
};
