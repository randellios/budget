// src/hooks/useDataLoader.js
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  loadBudgetData,
  selectIsLoading,
  selectLoadError,
  selectDataLoaded
} from '../store/slices/apiSlice';

export const useDataLoader = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const loadError = useAppSelector(selectLoadError);
  const dataLoaded = useAppSelector(selectDataLoaded);

  const reloadData = () => {
    dispatch(loadBudgetData());
  };

  return {
    isLoading,
    loadError,
    dataLoaded,
    reloadData
  };
};
