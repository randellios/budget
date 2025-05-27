// src/hooks/useDataLoader.js
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  loadBudgetData,
  selectIsLoading,
  selectLoadError
} from '../store/slices/apiSlice';

export const useDataLoader = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const loadError = useAppSelector(selectLoadError);

  useEffect(() => {
    dispatch(loadBudgetData());
  }, [dispatch]);

  return { isLoading, loadError };
};
